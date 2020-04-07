import { Injectable } from '@angular/core';
import { Event } from 'src/app/events/event';

@Injectable()
export class GameHasStarted extends Event {
  name = 'GameHasStarted';
  status = '';
}
