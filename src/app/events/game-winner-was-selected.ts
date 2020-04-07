import { Injectable } from '@angular/core';
import { Event } from 'src/app/events/event';

@Injectable()
export class GameWinnerWasSelected extends Event {
  name = 'GameWinnerWasSelected';
  status = '';
}
