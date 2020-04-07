import { Token } from './token';
import { AuthToken } from './auth-token';
import { Injectable, Inject, InjectionToken } from '@angular/core';

export const AUTH_CLIENT_ID = new InjectionToken('serenity.auth.client');

@Injectable()
export class Auth {
  constructor(
    @Inject(AUTH_CLIENT_ID) protected client: number,
    protected token: AuthToken
  ) {}

  check(): boolean {
    return this.token.exists();
  }

  guest(): boolean {
    return !this.check();
  }

  login(token: Token) {
    this.token.set(token);
  }

  logout() {
    this.token.destroy();
  }
}
