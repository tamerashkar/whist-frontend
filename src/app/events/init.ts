import { Injectable } from '@angular/core';
import { Event } from 'src/app/events/event';

@Injectable({ providedIn: 'root' })
export class Init extends Event {
  name = 'Init';
  delay = 0;
}
