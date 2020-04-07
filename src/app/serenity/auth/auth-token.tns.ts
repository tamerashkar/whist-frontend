import {
  remove,
  setNumber,
  getString,
  setString
} from 'tns-core-modules/application-settings';

import { Token } from './token';
import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthToken {
  static COOKIE_NAME = 'token';

  protected token: string;

  constructor() {}

  get() {
    return getString('token_type');
  }

  set(token: Token) {
    this.token = token.accessToken;

    setString('token_type', token.tokenType);
    setNumber('expires_in', token.expiresIn);
    setString('access_token', token.accessToken);
    setString('refresh_token', token.refreshToken);
  }

  destroy() {
    this.token = null;

    remove('token_type');
    remove('expires_in');
    remove('access_token');
    remove('refresh_token');
  }

  exists() {
    return !!this.token;
  }

  injectIntoRequest(request: HttpRequest<any>): HttpRequest<any> {
    // if (this.get()) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZmZmEyODhmM2ZkOTEyZjBhMTZhN2E3NThlYzIzMTc5MDI5ZjhjZDBkZmU1ODI5OTc4NjFiMmIyN2NhOWIwZTc5M2Q2MmY2OTVkNmYyNDc2In0.eyJhdWQiOiIyIiwianRpIjoiNmZmYTI4OGYzZmQ5MTJmMGExNmE3YTc1OGVjMjMxNzkwMjlmOGNkMGRmZTU4Mjk5Nzg2MWIyYjI3Y2E5YjBlNzkzZDYyZjY5NWQ2ZjI0NzYiLCJpYXQiOjE1NjU1Njg3ODAsIm5iZiI6MTU2NTU2ODc4MCwiZXhwIjoxNTk3MTkxMTgwLCJzdWIiOiJmNWYzNjlhMC03ZWE1LTRiOTMtYTYxZC1lYzI4MjMzMDk0MTMiLCJzY29wZXMiOlsiKiJdfQ.dVzPgHzZAcmYWfcZIy4yInOxyA6X3pbDMJRLkjsr0tctrAvOQCBhV-utplE7seN_2wQqqPgWHgcHACZVTWf1zL9HQnPhfkj9nfcSwZFqli3jsqsUTDzbNAgvX0yd_XteIROQLEy8ZrqeFYFR3T6ufBW040nBQxC3W-kNpBnordV7xL5r7xGvEzSRmsuJkefRlN3Fpch4KoaQuVBLFS55zXHq_hxKh67d3zH9dmk2I3l5tLudeFcyk5S9p2qgk-M-qvLiq9iVAi6hH0BdVvXo6R2lpWIFkzOb7qAfDto7IcJp27jRgupdzk820vXpP8fhSilqh_cKg5xWXtuM6L30rxVPnloQ66tU5rxhysUPta478wdQDbx0bvohL_PH4xtY75-SVPjv9dV3Kd5-4vDT1cAoBAGeCdXyHxbyxETcq114ni0y8pSYWvcu0uGhB6VNNSZmUhRY9I7HBdpto0AD257GujH2fnuwEmuhfkqufy3QGFcJYosF3XSGQm4vzlyvCr1Gzqujc7QEh1SUBKxUV137hDw0waZDfWxiBihYxrzUXAQyaQMRJMF4yaP3J16nnfEBG1CZy4RfCMx76wzqpOukTgPWJll0jdhzeqbzNWvyfF_pdd-GQlsjUh9_h-UITpbs1uD5nMKoHlbVkXvlZ-eyZs01Z1YHurA4jNpA7Aw`
      }
    });
    // }
    return request;
  }
}
