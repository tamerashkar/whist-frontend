import {
  OnDestroy,
  Component,
  QueryList,
  ViewChild,
  ElementRef,
  ViewChildren,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  tap,
  map,
  delay,
  first,
  filter,
  catchError,
  withLatestFrom,
  distinctUntilChanged,
} from 'rxjs/operators';

import {
  state,
  style,
  trigger,
  animate,
  transition,
} from '@angular/animations';

import { Player } from 'src/app/models/player';
import { WhistService } from 'src/app/services/whist.service';
import { StateService } from 'src/app/services/state.service';
import { Bid } from 'src/app/components/bidder/bidder.component';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { DeckComponent } from 'src/app/components/deck/deck.component';
import { Observable, Subject, Subscription, combineLatest, of } from 'rxjs';
import { PlayerComponent } from 'src/app/components/player/player.component';
import { DealerChipComponent } from 'src/app/components/dealer-chip/dealer-chip.component';
import { TableCardsComponent } from 'src/app/components/table-cards/table-cards.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('winner', [
      state(
        'move',
        style({
          transform: 'scale(.9) translate({{left}}, {{top}})',
        }),
        { params: { left: '0px', top: '0px' } }
      ),
      transition('* => move', [animate('0.7s')]),
    ]),
  ],
})
export class TableComponent implements OnDestroy, AfterViewInit {
  dealer$: Observable<Player> = this.whistService.dealer$;

  players$: Observable<Player[]> = this.whistService.players$;

  activePlayer$: Observable<Player> = this.whistService.activePlayer$;

  playersToRightOfDealer$: Observable<Player[]> = this.whistService
    .playersToRightOfDealer$;

  bidding$: Observable<boolean> = this.whistService.bidding$;

  minimumBid$: Observable<number> = this.whistService.minimumBid$;

  myTurnToBid$: Observable<boolean> = this.whistService.turnToBid$;

  announceMyTurn$: Observable<boolean> = this.whistService.turnToPlayCard$.pipe(
    filter((turn) => turn),
    tap((val) => this.snackBar.success('It\'s your turn to play'))
  );

  bidWasRequested$: Observable<boolean> = this.stateService.name$.pipe(
    map((name) => name === 'BidWasRequested')
  );

  indexOfMyComponent$: Observable<number> = combineLatest([
    this.whistService.me$,
    this.playersToRightOfDealer$,
  ]).pipe(
    map(([me, players]) => players.findIndex((player) => player.id === me.id))
  );

  dealCards$ = new Subject();

  cardsWereDealt$: Observable<boolean> = this.stateService.name$.pipe(
    map((name) => name === 'CardsWereDealt'),
    distinctUntilChanged(),
    filter((cardsWereDealt) => cardsWereDealt),
    tap(() => this.dealCards$.next())
  );

  handWinnerWasSelected$: Observable<boolean> = this.stateService.name$.pipe(
    map((name) => name === 'HandWinnerWasSelected'),
    distinctUntilChanged(),
    filter((handWinnerWasSelected) => handWinnerWasSelected)
  );

  onDealCards$ = this.dealCards$.pipe(
    filter(() => !!this.playerComponents.length),
    withLatestFrom(this.playersToRightOfDealer$),
    tap(() => this.deckComponent.show()),
    tap(() => this.deckComponent.shuffle()),
    delay(1000),
    tap(() => this.deckComponent.shuffle())
  );

  @ViewChild(DeckComponent)
  deckComponent: DeckComponent;

  @ViewChild(DealerChipComponent)
  dealerChipComponent: DealerChipComponent;

  @ViewChildren(PlayerComponent)
  playerComponents: QueryList<PlayerComponent>;

  @ViewChild(TableCardsComponent)
  tableCardsComponent: TableCardsComponent;

  seats = ['bottom', 'right', 'top', 'left'];

  winnerSelected: null | { left: number; top: number };

  protected subscriptions: Subscription[] = [];

  constructor(
    protected cdr: ChangeDetectorRef,
    protected elementRef: ElementRef,
    protected snackBar: SnackBarService,
    protected whistService: WhistService,
    protected stateService: StateService
  ) {}

  ngAfterViewInit() {
    this.subscriptions = [
      this.onDealCards$.subscribe(),
      this.cardsWereDealt$.subscribe(),
      this.handWinnerWasSelected$.subscribe(),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onCardDealt(index: number) {
    combineLatest([this.players$, this.indexOfMyComponent$])
      .pipe(
        first(),
        filter(([players, myIndex]) => index % players.length === myIndex),
        tap(([players]) =>
          this.whistService.displayCard(Math.floor(index / players.length))
        )
      )
      .subscribe();
  }

  onCardsDealt() {
    // Delay this to give more natural feel.
    setTimeout(() => this.deckComponent.hide(), 1000);
  }

  onSelectBid(bid: Bid) {
    // Is it our turn to bid?
    // @todo(tamer) that should be under the .bid method
    // and should throw exception when it isn not our turn to bid.
    // If it receives back a server error, it should throw new ServerException();
    this.whistService
      .bid(bid.amount)
      .pipe(
        catchError((error) => {
          this.snackBar.serverError(error);
          return of(null);
        })
      )
      .subscribe();
  }
}
