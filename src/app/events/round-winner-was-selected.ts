import { Injectable } from '@angular/core';
import { Event } from 'src/app/events/event';

@Injectable()
export class RoundWinnerWasSelected extends Event {
  name = 'RoundWinnerWasSelected';
  status = '';
  delay = 1000;
}
