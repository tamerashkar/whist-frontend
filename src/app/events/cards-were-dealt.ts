import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { State } from 'src/app/models/state';
import { Event } from 'src/app/events/event';
import { WhistService } from 'src/app/services/whist.service';

@Injectable()
export class CardsWereDealt extends Event {
  name = 'CardsWereDealt';
  status = '';
  delay = 15000;

  constructor(protected whistService: WhistService) {
    super();
  }

  getStatus(state: State) {
    const dealer = state.game.players.find(
      (player) => player.id === state.game.dealer
    );

    return of(`${dealer.name} is dealing the cards`);
  }

  handle(state: State): Observable<State> {
    // @todo(tamer) - the cards get set then the event gets set
    // so at one point, we show the cards then hide them again.
    this.whistService.displayedCardsIndexes$.next([]);

    return this.whistService.fetchCards(state.game.id).pipe(map(() => state));
  }
}
