import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { State } from 'src/app/models/state';
import { Event } from 'src/app/events/event';

@Injectable()
export class PlayerHasBid extends Event {
  name = 'PlayerHasBid';

  getStatus(state: State): Observable<string> {
    const player = state.game.players.find(p => p.turn === state.game.turn);

    return of(`${player.name} has bid`);
  }
}
