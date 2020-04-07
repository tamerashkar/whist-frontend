import { Injectable } from '@angular/core';
import { Event } from 'src/app/events/event';

@Injectable()
export class TrumpSuitWasSelected extends Event {
  name = 'TrumpSuitWasSelected';
  status = '';
  delay = 1000;
}
