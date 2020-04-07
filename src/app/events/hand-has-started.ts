import { Injectable } from '@angular/core';
import { Event } from 'src/app/events/event';

@Injectable()
export class HandHasStarted extends Event {
  name = 'HandHasStarted';
  status = '';
}
