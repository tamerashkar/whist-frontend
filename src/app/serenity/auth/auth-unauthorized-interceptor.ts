import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { Auth } from './auth';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthUnauthorizedInterceptor implements HttpInterceptor {
  constructor(protected auth: Auth, protected router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.auth.logout();
              this.router.navigate(['/login']);
            }

            if (err.status === 0) {
              console.error('CORS issue.');
            }
          }
        }
      )
    );
  }
}
