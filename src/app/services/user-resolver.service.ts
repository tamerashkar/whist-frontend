import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<boolean> {
  constructor(protected userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.userService.fetch();
  }
}
