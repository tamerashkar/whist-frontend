import { Injectable } from '@angular/core';
import { Event } from 'src/app/events/event';

@Injectable()
export class RoundHasStarted extends Event {
  name = 'RoundHasStarted';
  status = '';
}
