import { Injectable } from '@angular/core';
import { Event } from 'src/app/events/event';

@Injectable()
export class BiddingHasEnded extends Event {
  name = 'BiddingHasEnded';
  status = '';
}
