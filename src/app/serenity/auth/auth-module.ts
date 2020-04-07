import { Auth } from './auth';
import { NgModule } from '@angular/core';
import { AuthToken } from './auth-token';
import { Authenticated } from './authenticated';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptor } from './auth-token-interceptor';
import { AuthUnauthorizedInterceptor } from './auth-unauthorized-interceptor';

@NgModule({
  providers: [
    Auth,
    AuthToken,
    Authenticated,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthUnauthorizedInterceptor,
      multi: true
    }
  ]
})
export class AuthModule {}
