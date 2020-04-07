import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  static DURATION = 3000;

  messages = {
    default: 'Oops, something went wrong.',
    403: 'You do not have permissions for this action.',
    404: 'The page could not be found.',
    413: 'The given file is too large.',
    422: 'The given data is invalid.',
    429: 'Too many requests.',
    503: 'We are currently down for maintenance. Please check back soon.',
  };

  constructor(protected snackBar: MatSnackBar) {}

  success(message: string) {
    return this.snackBar.open(message, '', {
      duration: SnackBarService.DURATION,
    });
  }

  error(message: string) {
    return this.snackBar.open(message, '', {
      duration: SnackBarService.DURATION,
    });
  }

  serverError(
    error: HttpErrorResponse,
    action?: string,
    config?: MatSnackBarConfig
  ): MatSnackBarRef<SimpleSnackBar> {
    let message = this.messages.default;

    if (error) {
      if (error.status === 403) {
        message = this.messages[403];
      } else if (error.status === 404) {
        message = this.messages[404];
      } else if (error.status === 413) {
        message = this.messages[413];
      } else if (error.status === 422) {
        message = this.messages[422];
        if (error.error && error.error.message) {
          const errors = Object.values(error.error.errors);
          message = errors.length
            ? Array.isArray(errors[0])
              ? errors[0][0]
              : errors[0]
            : error.error.message;
        }
      } else if (error.status === 429) {
        message = this.messages[429];
      } else if (error.status === 503) {
        message = this.messages[503];
      }
    }

    return this.snackBar.open(message, action, {
      duration: SnackBarService.DURATION,
      ...config,
    });
  }
}
