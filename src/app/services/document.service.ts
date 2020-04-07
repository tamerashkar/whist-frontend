import { tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService implements OnDestroy {
  visible$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  baseTitle = 'Play Whist | Multiplayer Card Game';

  title$: BehaviorSubject<string> = new BehaviorSubject('');

  updateTitle$: Observable<string> = this.title$.pipe(
    tap((title) => (this.document.title = title || this.baseTitle))
  );

  protected subscriptions: Subscription[] = [this.updateTitle$.subscribe()];

  constructor(@Inject(DOCUMENT) protected document) {
    this.document.addEventListener('visibilitychange', () => {
      this.visible$.next(this.document.visibilityState === 'visible');
    });
  }

  title(title: string, append = true) {
    this.title$.next(title + (append ? ' ' + this.baseTitle : ''));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
