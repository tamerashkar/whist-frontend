import { of } from 'rxjs';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { WhistService } from 'src/app/services/whist.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { OnInit, Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-create-game-page',
  templateUrl: './create-game-page.component.html',
  styleUrls: ['./create-game-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGamePageComponent implements OnInit {
  constructor(
    protected snackBarService: SnackBarService,
    protected whistService: WhistService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    // @todo(tamer) - We can move this to a resolver.
    this.whistService
      .create()
      .pipe(
        tap((game) =>
          this.router.navigate(['/game/' + game.data.id], { replaceUrl: true })
        ),
        catchError((error) => {
          this.snackBarService.serverError(error);

          return of(null);
        })
      )
      .subscribe();
  }
}
