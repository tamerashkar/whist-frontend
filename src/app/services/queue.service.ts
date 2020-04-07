import {
  map,
  tap,
  delay,
  filter,
  concatMap,
  shareReplay,
} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Queue } from 'src/app/models/queue';
import { State } from 'src/app/models/state';
import { Event } from 'src/app/events/event';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  delay = 0;

  queue$: Subject<Queue> = new Subject();

  next$: Observable<Queue> = this.queue$.pipe(
    concatMap((queue) =>
      queue.event.handle(queue.state).pipe(
        delay(this.delay),
        map(() => queue)
      )
    ),
    tap((queue) => (this.delay = queue.event.delay || 0)),
    shareReplay()
  );

  event$: Observable<Event> = this.next$.pipe(
    filter((queue) => !!queue),
    map((queue) => queue.event)
  );

  state$: Observable<State> = this.next$.pipe(
    filter((queue) => !!queue),
    map((queue) => queue.state)
  );

  enqueue(queue: Queue) {
    this.queue$.next(queue);
  }
}
