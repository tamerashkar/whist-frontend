import { Injectable } from '@angular/core';
import { Event } from 'src/app/events/event';
import { State } from 'src/app/models/state';
import { of } from 'rxjs';

@Injectable()
export class HandWinnerWasSelected extends Event {
  name = 'HandWinnerWasSelected';
  status = '';
  delay = 6500;

  getStatus(state: State) {
    const winner = state.game.players.find(player => player.handWinner);

    return of(`${winner.name} has won the hand`);
  }
}
