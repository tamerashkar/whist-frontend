import { Injectable } from '@angular/core';
import { Event } from 'src/app/events/event';

@Injectable()
export class PlayerHasLeftTeam extends Event {
  name = 'PlayerHasLeftTeam';
  status = '';
}
