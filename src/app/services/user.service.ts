import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { Auth } from 'src/app/serenity/auth';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Response } from 'src/app/models/response';
import { environment } from 'src/environments/environment';
import { tap, map, filter, distinctUntilChanged } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  user$: BehaviorSubject<User> = new BehaviorSubject(null);

  player$: Observable<string> = this.user$.pipe(
    filter((user) => !!user),
    map((user) => user.player),
    distinctUntilChanged()
  );

  constructor(protected auth: Auth, protected http: HttpClient) {}

  register(params: {
    name: string;
    username: string;
    password: string;
  }): Observable<Response<any>> {
    return this.http
      .post<any>(environment.baseUrl + 'api/user', {
        ...params,
        scope: '*',
        client_id: environment.authClientId,
        client_secret: environment.authClientSecret,
        grant_type: 'password',
      })
      .pipe(
        tap((token) =>
          this.auth.login({
            expiresIn: token.expires_in,
            tokenType: token.token_type,
            accessToken: token.access_token,
            refreshToken: token.refresh_token,
          })
        )
      );
  }

  fetch(): Observable<Response<User>> {
    return this.http
      .get<Response<User>>(environment.baseUrl + 'api/user')
      .pipe(tap((response) => this.user$.next(response.data)));
  }
}
