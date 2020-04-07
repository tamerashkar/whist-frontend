import { Injectable } from '@angular/core';
import { Event } from 'src/app/events/event';

@Injectable()
export class PlayerHasJoinedTeam extends Event {
  name = 'PlayerHasJoinedTeam';
  status = '';
}
