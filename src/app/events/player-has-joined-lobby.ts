import { Injectable } from '@angular/core';
import { Event } from 'src/app/events/event';

@Injectable()
export class PlayerHasJoinedLobby extends Event {
  name = 'PlayerHasJoinedLobby';
  status = '';
}
