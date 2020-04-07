import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Event } from 'src/app/events/event';
import { State } from 'src/app/models/state';

@Injectable()
export class BidWinnerWasSelected extends Event {
  name = 'BidWinnerWasSelected';
  status = 'Bid winner has been selected';
  delay = 1000;

  getStatus(state: State) {
    const winner = state.game.players.find(player => player.bidWinner);

    return of(`${winner.name} has won the bidding with ${winner.bid}`);
  }
}
