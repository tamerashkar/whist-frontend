import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  pusher: Pusher = new Pusher(environment.pusherKey, {
    cluster: 'us3',
    forceTLS: true,
    authEndpoint: environment.pusherBroadcastingAuth,
  });

  echo: Echo = new Echo({ broadcaster: 'pusher', client: this.pusher });

  channel(name: string) {
    return this.echo.channel(name);
  }

  leaveChannel(name: string) {
    return this.echo.leaveChannel(name);
  }
}
