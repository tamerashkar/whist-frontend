import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { Auth } from './auth';
import { Injectable } from '@angular/core';
import { LocalStorage } from 'src/app/serenity/support';

@Injectable()
export class Authenticated implements CanActivate {
  constructor(
    public auth: Auth,
    protected localStorage: LocalStorage,
    protected router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.check()) {
      return true;
    }

    this.localStorage.set('redirect', state.url.split('?')[0]);
    this.router.navigate(['/login']);

    return false;
  }
}
