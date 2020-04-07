import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Queue } from 'src/app/models/queue';
import { Whist } from 'src/app/models/whist';
import { map, switchMap } from 'rxjs/operators';
import { QueueService } from 'src/app/services/queue.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  name$: Observable<string> = this.queueService.event$.pipe(
    map((event) => event.name)
  );

  status$: Observable<string> = this.queueService.next$.pipe(
    switchMap((queue) => queue.event.getStatus(queue.state))
  );

  game$: Observable<Whist> = this.queueService.state$.pipe(
    map((state) => state.game)
  );

  constructor(protected queueService: QueueService) {}

  queue(queue: Queue) {
    this.queueService.enqueue(queue);
  }
}
