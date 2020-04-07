import { Injectable } from '@angular/core';
import { Event } from 'src/app/events/event';

@Injectable()
export class DealerWasSelected extends Event {
  name = 'DealerWasSelected';
  status = '';
}
