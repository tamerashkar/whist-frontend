import { Event } from 'src/app/events/event';
import { Observable, Subscription } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { QueueService } from 'src/app/services/queue.service';
import { EventsService } from 'src/app/services/events.service';

@Injectable({
  providedIn: 'root'
})
export class EventFactoryService implements OnDestroy {
  protected subscriptions: Subscription[] = [];

  constructor(
    protected queueService: QueueService,
    protected eventsService: EventsService
  ) {}

  events() {
    return this.eventsService;
  }

  register(channel: any) {
    for (const event of this.eventsService.all()) {
      this.subscriptions.push(this.queue(channel, event).subscribe());
    }
  }

  unregister() {
    this.ngOnDestroy();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  listen(channel: any, event: Event): Observable<any> {
    return new Observable((observer: any) => {
      const callback = (data: Event) => observer.next(data);

      channel.listen(event.name, callback);

      return () => {
        channel.stopListening(event.name);
      };
    });
  }

  queue(channel: any, event: Event): Observable<Event> {
    return this.listen(channel, event).pipe(
      tap(response =>
        this.queueService.enqueue({
          event,
          state: {
            game: response.game
          }
        })
      ),
      shareReplay()
    );
  }
}
