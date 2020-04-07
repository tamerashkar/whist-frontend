import { Event } from 'src/app/events/event';
import { Injectable, Inject } from '@angular/core';
import { EVENTS } from 'src/app/events/events.module';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(@Inject(EVENTS) protected events) {}

  all(): Event[] {
    return this.events;
  }

  find(name: string) {
    return this.events.find(event => event.name === name);
  }
}
