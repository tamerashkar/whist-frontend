import { Observable, of } from 'rxjs';
import { State } from 'src/app/models/state';

export const DefaultEventDelay = 0;

export abstract class Event {
  abstract name: string;
  status = '';
  delay = DefaultEventDelay;

  getStatus(state: State): Observable<string> {
    return of(this.status);
  }

  handle(state: State): Observable<State> {
    return of(state);
  }
}
