import {
  Input,
  OnInit,
  Output,
  Component,
  OnDestroy,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { tap } from 'rxjs/operators';
import { BehaviorSubject, Subscription, interval, Observable } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountdownComponent implements OnInit, OnDestroy {
  @Input()
  seconds: number;

  @Output()
  countdownComplete: EventEmitter<void> = new EventEmitter();

  value$: BehaviorSubject<number> = new BehaviorSubject(null);

  update$: Observable<number> = interval(1000).pipe(
    tap(() =>
      this.value$.getValue() > 1
        ? this.value$.next(this.value$.getValue() - 1)
        : this.countdownComplete.emit()
    )
  );

  protected subscriptions: Subscription[] = [];

  constructor() {}

  ngOnInit(): void {
    this.value$.next(this.seconds);

    this.subscriptions = [this.update$.subscribe()];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
