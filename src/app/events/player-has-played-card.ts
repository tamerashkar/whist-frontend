import { Injectable } from '@angular/core';
import { Event } from 'src/app/events/event';

@Injectable()
export class PlayerHasPlayedCard extends Event {
  name = 'PlayerHasPlayedCard';
  status = '';
  delay = 300;
}
