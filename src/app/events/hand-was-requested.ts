import { Injectable } from '@angular/core';
import { Event } from 'src/app/events/event';

@Injectable()
export class HandWasRequested extends Event {
  name = 'HandWasRequested';
  status = '';
}
