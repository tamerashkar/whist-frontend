import { Injectable } from '@angular/core';
import { Event } from 'src/app/events/event';

@Injectable()
export class RoundWasRequested extends Event {
  name = 'RoundWasRequested';
  status = '';
}
