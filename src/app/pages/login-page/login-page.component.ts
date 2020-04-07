import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';

import { Router } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from 'angularx-social-login';
import { LocalStorage } from 'src/app/serenity/support';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  hidePassword = true;

  form = new FormGroup({
    name: new FormControl(environment.loginName, [Validators.required]),
    email: new FormControl(environment.loginEmail, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(environment.loginPassword, [Validators.required]),
  });

  redirect = this.localStorage.pluck('redirect', '/');

  buttonText = this.redirect === '/game/create' ? 'CREATE GAME' : 'JOIN GAME';

  displayForgotPassword$ = new BehaviorSubject(false);

  constructor(
    protected router: Router,
    protected userService: UserService,
    protected snackBar: SnackBarService,
    protected localStorage: LocalStorage,
    protected authService: AuthService
  ) {}

  ngOnInit(): void {}

  getNameErrorMessage() {
    if (this.form.get('name').hasError('required')) {
      return 'Name is required';
    }
    return '';
  }

  getEmailErrorMessage() {
    if (this.form.get('email').hasError('required')) {
      return 'Email is required';
    }
    return this.form.get('email').hasError('email') ? 'Email is not valid' : '';
  }

  getPasswordErrorMessage() {
    if (this.form.get('password').hasError('required')) {
      return 'Password is required';
    }
    return '';
  }

  onSubmit() {
    if (this.form.valid) {
      this.userService
        .register({
          name: this.form.get('name').value,
          username: this.form.get('email').value,
          password: this.form.get('password').value,
        })
        .pipe(
          tap(() =>
            this.router.navigate([this.redirect], { replaceUrl: true })
          ),
          catchError(() => {
            this.displayForgotPassword$.next(true);
            this.snackBar.error('The email or password is incorrect');
            return of(null);
          })
        )
        .subscribe();
    }
  }

  onLoginWithFacebook() {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((response) => {})
      .catch((error) => {});
  }

  onLoginWithGoogle() {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((response) => {})
      .catch((error) => {});
  }
}
