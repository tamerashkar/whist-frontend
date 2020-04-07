import { Whist } from 'src/app/models/whist';
import { Player } from 'src/app/models/player';
import { Observable, of, combineLatest } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map, first, tap } from 'rxjs/operators';
import { WhistService } from 'src/app/services/whist.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-team-selection',
  templateUrl: './team-selection.component.html',
  styleUrls: ['./team-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamSelectionComponent implements OnInit {
  isHost$ = this.whistService.isHost$;
  game$: Observable<Whist> = this.whistService.game$;
  link$: Observable<string> = this.game$.pipe(
    map((game) => `${environment.url}/game/${game.id}`)
  );
  me$: Observable<Player> = this.whistService.me$;
  players$: Observable<Player[]> = this.whistService.players$;
  teamA$: Observable<Player[]> = this.whistService.teamA$;
  teamB$: Observable<Player[]> = this.whistService.teamB$;
  oneOnOne$ = combineLatest([this.teamA$, this.teamB$]).pipe(
    map(([teamA, teamB]) => teamA.length <= 1 && teamB.length <= 1)
  );

  missingTeamAPlayers$: Observable<any> = combineLatest([
    this.teamA$,
    this.oneOnOne$,
  ]).pipe(
    map(([team, oneOnOne]) =>
      new Array((oneOnOne ? 1 : 2) - team.length)
        .fill(0)
        .map((_, i) => i + team.length + 1)
    )
  );

  missingTeamBPlayers$: Observable<any> = combineLatest([
    this.teamB$,
    this.oneOnOne$,
  ]).pipe(
    map(([team, oneOnOne]) =>
      new Array((oneOnOne ? 1 : 2) - team.length)
        .fill(0)
        .map((_, i) => i + team.length + 1)
    )
  );
  canJoinTeamA$: Observable<boolean> = this.whistService.canJoinTeamA$;
  canJoinTeamB$: Observable<boolean> = this.whistService.canJoinTeamB$;
  canStartGame$: Observable<boolean> = this.whistService.canStartGame$;

  constructor(
    protected snackBar: SnackBarService,
    protected whistService: WhistService
  ) {}

  ngOnInit(): void {}

  onJoinTeam(team: number) {
    this.whistService
      .join(team)
      .pipe(
        catchError((error) => {
          this.snackBar.serverError(error);

          return of(null);
        })
      )
      .subscribe();
  }

  onAddRobot(team: number) {
    this.whistService
      .addRobot(team)
      .pipe(
        catchError((error) => {
          this.snackBar.serverError(error);

          return of(null);
        })
      )
      .subscribe();
  }

  onLeaveTeam(player: string) {
    this.whistService
      .leave(player)
      .pipe(
        catchError((error) => {
          this.snackBar.serverError(error);

          return of(null);
        })
      )
      .subscribe();
  }

  onStartGame() {
    this.whistService
      .start()
      .pipe(
        catchError((error) => {
          this.snackBar.serverError(error);

          return of(null);
        })
      )
      .subscribe();
  }

  onCopyLink() {
    this.link$
      .pipe(
        first(),
        tap((link) => this.copy(link)),
        tap(() => this.snackBar.success('Copied to clipboard'))
      )
      .subscribe();
  }

  protected copy(text) {
    const input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    const result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
  }
}
