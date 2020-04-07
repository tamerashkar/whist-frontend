import { Injectable } from '@angular/core';
import { Event } from 'src/app/events/event';

@Injectable()
export class GameHasEnded extends Event {
  name = 'GameHasEnded';
  status = '';
}
