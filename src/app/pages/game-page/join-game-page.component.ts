import { of } from 'rxjs';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { WhistStatus } from 'src/app/models/whist-status';
import { WhistService } from 'src/app/services/whist.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { OnInit, Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-join-game-page',
  templateUrl: './join-game-page.component.html',
  styleUrls: ['./join-game-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinGamePageComponent implements OnInit {
  id = new FormControl('', [Validators.required]);

  constructor(
    protected router: Router,
    protected snackBar: SnackBarService,
    protected whistService: WhistService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.whistService
      .find(this.id.value)
      .pipe(
        tap((response) => {
          if (response && response.data.status !== WhistStatus.WINNER) {
            this.router.navigate([`/game/${this.id.value}`]);
          } else {
            this.snackBar.error('Game does not exist');
          }
        }),
        catchError(() => {
          this.snackBar.error('Game does not exist');

          return of(null);
        })
      )
      .subscribe();
    if (this.id.valid) {
    }
  }
}
