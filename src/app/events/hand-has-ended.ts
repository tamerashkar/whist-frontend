import { Injectable } from '@angular/core';
import { Event } from 'src/app/events/event';

@Injectable()
export class HandHasEnded extends Event {
  name = 'HandHasEnded';
  status = '';
}
