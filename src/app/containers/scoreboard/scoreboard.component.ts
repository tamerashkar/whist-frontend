import { combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { filter, map, shareReplay } from 'rxjs/operators';
import { StateService } from 'src/app/services/state.service';
import { WhistService } from 'src/app/services/whist.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
  trumpSuit$ = this.whistService.game$.pipe(map((game) => game.trumpSuit));

  homeTeamPoints$ = this.whistService.game$.pipe(
    map((game) => game.homeTeamPoints)
  );

  guestTeamPoints$ = this.whistService.game$.pipe(
    map((game) => game.guestTeamPoints)
  );

  bidWinner$ = combineLatest([
    this.whistService.players$,
    this.whistService.competing$,
  ]).pipe(
    filter(([players, competing]) => competing),
    map(([players]) => players.find((player) => player.bidWinner)),
    shareReplay()
  );

  homeTeamBid$ = this.bidWinner$.pipe(
    map((player) => (player && player.team === 1 ? player.bid : false))
  );

  guestTeamBid$ = this.bidWinner$.pipe(
    map((player) => (player && player.team === 2 ? player.bid : false))
  );

  homeTeamHandWins$ = this.whistService.players$.pipe(
    map((players) => players.filter((player) => player.team === 1)),
    map((players) => players.reduce((t, player) => t + player.handWins, 0))
  );

  guestTeamHandWins$ = this.whistService.players$.pipe(
    map((players) => players.filter((player) => player.team === 2)),
    map((players) => players.reduce((t, player) => t + player.handWins, 0))
  );

  constructor(
    protected whistService: WhistService,
    protected stateService: StateService
  ) {}

  ngOnInit(): void {}
}
