import { Token } from './token';
import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { LocalStorage } from 'src/app/serenity/support';

@Injectable()
export class AuthToken {
  static COOKIE_NAME = 'token';

  protected token: string;

  constructor(protected localStorage: LocalStorage) {
    this.token = this.localStorage.get(AuthToken.COOKIE_NAME);
  }

  get() {
    return this.token;
  }

  set(token: Token) {
    this.token = token.accessToken;

    this.localStorage.set(AuthToken.COOKIE_NAME, this.token);
  }

  destroy() {
    this.token = null;
    this.localStorage.remove(AuthToken.COOKIE_NAME);
  }

  exists() {
    return !!this.token;
  }

  injectIntoRequest(request: HttpRequest<any>): HttpRequest<any> {
    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      });
    }
    return request;
  }
}
