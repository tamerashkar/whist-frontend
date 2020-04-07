import {
  OnInit,
  OnDestroy,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  map,
  tap,
  filter,
  switchMap,
  catchError,
  distinctUntilChanged
} from 'rxjs/operators';

import { Whist } from 'src/app/models/whist';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WhistService } from 'src/app/services/whist.service';
import { EventService } from 'src/app/services/event.service';
import { StateService } from 'src/app/services/state.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from 'src/app/services/document.service';
import { EventFactoryService } from 'src/app/services/event-factory.service';
import { Observable, Subscription, combineLatest, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamePageComponent implements OnInit, OnDestroy {
  documentVisibility = true;

  gameId$: Observable<string> = this.whistService.gameId$;

  game$: Observable<Whist> = combineLatest([
    this.whistService.game$,
    this.route.paramMap.pipe(map((params: ParamMap) => params.get('id')))
  ]).pipe(map(([game, id]) => (game.id === id ? game : null)));

  teamSelection$: Observable<boolean> = this.whistService.teamSelection$;

  fetched$ = new BehaviorSubject(false);

  fetch$ = this.route.paramMap.pipe(
    map((params: ParamMap) => params.get('id')),
    distinctUntilChanged(),
    tap(() => this.fetched$.next(false)),
    switchMap(id => this.whistService.find(id)),
    tap(response =>
      this.whistService.setGame({
        event: this.eventFactoryService.events().find(response.data.event),
        state: {
          game: response.data
        }
      })
    ),
    switchMap(response =>
      this.whistService.fetchCards(response.data.id).pipe(map(() => response))
    ),
    switchMap(response => this.whistService.fetchMessages(response.data.id)),
    tap(() => this.fetched$.next(true)),
    catchError(() => {
      this.snackBar.open('Game does not exist', '', { duration: 5000 });

      return this.router.navigate(['/']);
    })
  );

  updateTitle$ = this.stateService.status$.pipe(
    tap(status => this.documentService.title(status ? status : ' ', false))
  );

  announceTurn$ = combineLatest([
    this.whistService.turnToBid$,
    this.whistService.turnToPlayCard$
  ]).pipe(
    filter(() => 'Notification' in window),
    map(([bid, playCard]) => bid || playCard),
    distinctUntilChanged(),
    filter(turn => turn),
    filter(() => !this.documentService.visible$.getValue()),
    tap(() => {
      const notification = new Notification('Whist', {
        body: 'Your turn to play',
        icon: 'assets/images/chip.png'
      });

      notification.onclick = () => {
        window.open(window.location.href);
      };
    })
  );

  channel: any;

  channelName: string;

  channel$ = this.gameId$.pipe(
    distinctUntilChanged(),
    tap(() => this.unregisterListeners()),
    tap(id => this.registerListeners(id))
  );

  protected subscriptions: Subscription[] = [
    this.fetch$.subscribe(),
    this.channel$.subscribe(),
    this.updateTitle$.subscribe(),
    this.announceTurn$.subscribe()
  ];

  constructor(
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected route: ActivatedRoute,
    protected stateService: StateService,
    protected whistService: WhistService,
    protected eventService: EventService,
    protected documentService: DocumentService,
    protected eventFactoryService: EventFactoryService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.unregisterListeners();

    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  protected registerListeners(id: string) {
    this.channelName = `game.${id}`;
    this.channel = this.eventService.channel(this.channelName);
    this.eventFactoryService.register(this.channel);
    this.channel.listen('MessageWasCreated', e => {
      this.whistService.messages$.next(
        [e.message].concat(this.whistService.messages$.getValue())
      );
    });

    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }

  protected unregisterListeners() {
    if (this.channel) {
      this.channel.stopListening('MessageWasCreated');
      this.eventFactoryService.unregister();
      this.eventService.leaveChannel(this.channel);
    }
  }
}
