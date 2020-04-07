import { State } from 'src/app/models/state';
import { Event } from 'src/app/events/event';

export interface Queue {
  event: Event;
  state: State;
}
