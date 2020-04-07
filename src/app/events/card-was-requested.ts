import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { State } from 'src/app/models/state';
import { Event } from 'src/app/events/event';

@Injectable()
export class CardWasRequested extends Event {
  name = 'CardWasRequested';

  getStatus(state: State): Observable<string> {
    const player = state.game.players.find(p => p.turn === state.game.turn);

    return of(`Waiting for ${player.name} to play`);
  }
}
