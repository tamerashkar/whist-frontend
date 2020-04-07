import { Card } from 'src/app/models/card';
import { Whist } from 'src/app/models/whist';
import { Player } from 'src/app/models/player';
import { StateService } from 'src/app/services/state.service';
import { WhistService } from 'src/app/services/whist.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Observable, BehaviorSubject, of, combineLatest } from 'rxjs';
import { map, switchMap, first, tap, catchError } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent implements OnInit {
  me$: Observable<Player> = this.whistService.me$;

  game$: Observable<Whist> = this.whistService.game$;

  cards$: Observable<Card[]> = this.whistService.displayedCards$;

  turnToPlayCard$: Observable<boolean> = this.whistService.turnToPlayCard$;

  cardWasRequested$: Observable<boolean> = this.stateService.name$.pipe(
    map((name) => name === 'CardWasRequested')
  );

  selected$: BehaviorSubject<number> = new BehaviorSubject(null);

  constructor(
    protected snackBar: SnackBarService,
    protected stateService: StateService,
    protected whistService: WhistService
  ) {}

  ngOnInit(): void {}

  onCardSelected(index: number) {
    this.selected$.next(index);
  }

  onCardPlayed(card: Card) {
    combineLatest([this.game$, this.cards$])
      .pipe(
        first(),
        switchMap(([game, cards]) =>
          this.whistService.play(card).pipe(map(() => ({ game, cards })))
        ),
        switchMap(({ game, cards }) =>
          cards.length > 1
            ? this.whistService
                .fetchCards(game.id)
                .pipe(map(() => ({ game, cards })))
            : of({ game, cards })
        ),
        tap(({ game, cards }) =>
          cards.length > 1 ? this.selected$.next(null) : null
        ),
        catchError((error) => {
          this.selected$.next(null);

          this.snackBar.serverError(error);
          return of(null);
        })
      )
      .subscribe();
  }

  trackCardBy(index, card) {
    return card.suit + '-' + card.value;
  }
}
