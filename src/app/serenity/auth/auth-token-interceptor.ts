import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthToken } from './auth-token';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(protected token: AuthToken) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.token.injectIntoRequest(request));
  }
}
