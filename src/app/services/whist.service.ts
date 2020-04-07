import {
  tap,
  map,
  first,
  filter,
  switchMap,
  shareReplay,
} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Card } from 'src/app/models/card';
import { Suit } from 'src/app/models/suit';
import { Whist } from 'src/app/models/whist';
import { Queue } from 'src/app/models/queue';
import { Player } from 'src/app/models/player';
import { Message } from 'src/app/models/message';
import { HttpClient } from '@angular/common/http';
import { Response } from 'src/app/models/response';
import { WhistStatus } from 'src/app/models/whist-status';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { StateService } from 'src/app/services/state.service';
import { EventService } from 'src/app/services/event.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WhistService {
  container = null;

  playerId$ = this.userService.player$;

  messages$: BehaviorSubject<Message[]> = new BehaviorSubject([]);

  game$ = this.stateService.game$.pipe(shareReplay());

  gameId$: Observable<string> = this.game$.pipe(
    filter((game) => !!game),
    map((game) => game.id)
  );

  dealerId$: Observable<string> = this.game$.pipe(
    filter((game) => !!game),
    map((game) => game.dealer)
  );

  turn$: Observable<number> = this.game$.pipe(
    filter((game) => !!game),
    map((game) => game.turn)
  );

  status$: Observable<string> = this.game$.pipe(
    filter((game) => !!game),
    map((game) => game.status)
  );

  teamSelection$: Observable<boolean> = this.status$.pipe(
    map((status) => status === WhistStatus.TEAM_SELECTION)
  );

  bidding$: Observable<boolean> = this.status$.pipe(
    map((status) => status === WhistStatus.BIDDING)
  );

  competing$: Observable<boolean> = this.status$.pipe(
    map((status) => status === WhistStatus.COMPETE)
  );

  hostId$ = this.game$.pipe(
    filter((game) => !!game),
    map((game) => game.host)
  );

  isHost$ = combineLatest([this.playerId$, this.hostId$]).pipe(
    map(([hostId, playerId]) => hostId === playerId)
  );

  players$: Observable<Player[]> = combineLatest([
    this.game$,
    this.playerId$,
  ]).pipe(
    filter(([game, playerId]) => !!game && !!playerId),
    map(([game, playerId]) => {
      const index = game.players.findIndex((player) => player.id === playerId);

      // When this is the case, we have an outside observer watching the game,
      // We'll return in it the normal order.
      if (index === -1) {
        return game.players;
      }

      return [game.players[index]].concat(
        game.players.slice(index + 1),
        game.players.slice(0, index)
      );
    })
  );

  activePlayer$: Observable<Player> = combineLatest([
    this.players$,
    this.turn$,
  ]).pipe(
    map(([players, turn]) => players.find((player) => player.turn === turn))
  );

  dealer$: Observable<Player> = combineLatest([
    this.players$,
    this.dealerId$,
  ]).pipe(
    map(([players, dealerId]) =>
      players.find((player) => player.id === dealerId)
    )
  );

  isActivePlayerDealer$: Observable<boolean> = combineLatest([
    this.dealer$,
    this.activePlayer$,
  ]).pipe(map(([dealer, player]) => dealer.id === player.id));

  me$: Observable<Player> = combineLatest([this.players$, this.playerId$]).pipe(
    map(([players, id]) => players.find((player) => player.id === id))
  );

  playersToRightOfDealer$: Observable<Player[]> = combineLatest([
    this.game$,
    this.dealer$,
  ]).pipe(
    filter(([game, dealer]) => !!game && !!dealer),
    map(([game, dealer]) => {
      const index = game.players.findIndex((player) => player.id === dealer.id);

      return index === -1
        ? []
        : [].concat(
            game.players.slice(index + 1),
            game.players.slice(0, index),
            game.players[index]
          );
    })
  );

  bids$: Observable<number[]> = this.players$.pipe(
    map((players) => players.map((player) => player.bid))
  );

  minimumBid$: Observable<number> = combineLatest([
    this.bids$,
    this.isActivePlayerDealer$,
  ]).pipe(
    map(([bids, isDealer]) => {
      const min = Math.max(...bids);
      return isDealer ? min : min + 1;
    })
  );

  turnToBid$: Observable<boolean> = combineLatest([
    this.bidding$,
    this.me$,
    this.turn$,
  ]).pipe(map(([bidding, player, turn]) => bidding && player.turn === turn));

  turnToPlayCard$: Observable<boolean> = combineLatest([
    this.competing$,
    this.me$,
    this.turn$,
  ]).pipe(
    map(([competing, player, turn]) => competing && player.turn === turn)
  );

  cards$: BehaviorSubject<Card[]> = new BehaviorSubject([]);

  displayedCardsIndexes$: BehaviorSubject<number[]> = new BehaviorSubject([]);

  order = {
    [Suit.Club]: 0,
    [Suit.Heart]: 3,
    [Suit.Spade]: 2,
    [Suit.Diamond]: 1,
  };

  displayedCards$ = combineLatest([
    this.cards$,
    this.bidding$,
    this.competing$,
    this.stateService.name$,
    this.displayedCardsIndexes$,
  ]).pipe(
    map(([cards, bidding, competing, name, indexes]) => {
      if (bidding || competing) {
        cards.sort(
          (a, b) => this.order[a.suit] - this.order[b.suit] || a.value - b.value
        );
        return cards;
      }

      return indexes.map((index) => cards[index]);
    })
  );

  teamA$ = this.players$.pipe(
    map((players) => players.filter((player) => player.team === 1))
  );

  teamB$ = this.players$.pipe(
    map((players) => players.filter((player) => player.team === 2))
  );

  canJoinTeamA$: Observable<boolean> = this.teamA$.pipe(
    map((players) => players.length < 2)
  );

  canJoinTeamB$: Observable<boolean> = this.teamB$.pipe(
    map((players) => players.length < 2)
  );

  canStartGame$: Observable<boolean> = combineLatest([
    this.teamA$,
    this.teamB$,
  ]).pipe(
    map(
      ([teamA, teamB]) =>
        (teamA.length === 1 && teamB.length === 1) ||
        (teamA.length === 2 && teamB.length === 2)
    )
  );

  channel = this.eventService.channel(`game`);

  constructor(
    protected http: HttpClient,
    protected userService: UserService,
    protected stateService: StateService,
    protected eventService: EventService
  ) {}

  setContainer(container) {
    this.container = container;
  }

  create(): Observable<Response<Whist>> {
    return this.http.post<Response<Whist>>(
      environment.baseUrl + 'api/game',
      {}
    );
  }

  find(id: string): Observable<Response<Whist>> {
    return this.http.get<Response<Whist>>(
      environment.baseUrl + 'api/game/' + id
    );
  }

  setGame(queue: Queue) {
    this.stateService.queue(queue);
  }

  fetchCards(game: string): Observable<Response<Card[]>> {
    return combineLatest([this.playerId$]).pipe(
      first(),
      switchMap(([player]) =>
        this.http.get<Response<Card[]>>(
          environment.baseUrl + 'api/game/' + game + '/player/' + 'card'
        )
      ),
      tap((response) => this.cards$.next(response.data))
    );
  }

  createMessage(body: string): Observable<Response<Message>> {
    return this.gameId$.pipe(
      first(),
      switchMap((game) => {
        return this.http.post<Response<Message>>(
          environment.baseUrl + 'api/game/' + game + '/message',
          { body }
        );
      })
    );
  }

  fetchMessages(game: string): Observable<Response<Message[]>> {
    return this.http
      .get<Response<Message[]>>(
        environment.baseUrl + 'api/game/' + game + '/message'
      )
      .pipe(tap((response) => this.messages$.next(response.data)));
  }

  update(id: string, params: {} = {}): Observable<Response<Whist>> {
    return this.http.put<Response<Whist>>(
      environment.baseUrl + 'api/game/' + id,
      params
    );
  }

  start(): Observable<Response<Whist>> {
    return this.gameId$.pipe(
      first(),
      switchMap((id) => this.update(id, { start: true }))
    );
  }

  addRobot(team: number) {
    return this.gameId$.pipe(
      first(),
      switchMap((game) =>
        this.http.post<Response<Player>>(
          environment.baseUrl + 'api/game/' + game + '/player',
          { team, robot: true }
        )
      )
    );
  }

  join(team: number) {
    return combineLatest([this.gameId$, this.playerId$]).pipe(
      first(),
      switchMap(([game, player]) =>
        this.http.post<Response<Player>>(
          environment.baseUrl + 'api/game/' + game + '/player',
          { team, player }
        )
      )
    );
  }

  leave(player: string) {
    return this.gameId$.pipe(
      first(),
      switchMap((game) =>
        this.http.delete<Response<Player>>(
          environment.baseUrl + 'api/game/' + game + '/player/' + player
        )
      )
    );
  }

  bid(bid: number): Observable<Response<any>> {
    // @todo(tamer) - verify it is our turn to bid

    return combineLatest([this.gameId$, this.playerId$]).pipe(
      first(),
      switchMap(([game, player]) =>
        this.http.put<Response<Whist>>(
          environment.baseUrl + 'api/game/' + game + '/player/' + player,
          { bid }
        )
      )
    );
  }

  play(card: Card): Observable<Response<any>> {
    // @todo(tamer) - verify it is our turn to play card

    return combineLatest([this.gameId$, this.playerId$]).pipe(
      first(),
      switchMap(([game, player]) =>
        this.http.put<Response<Whist>>(
          environment.baseUrl + 'api/game/' + game + '/player/' + player,
          { card }
        )
      )
    );
  }

  displayCard(index: number) {
    this.displayedCardsIndexes$.next([
      ...this.displayedCardsIndexes$.getValue(),
      index,
    ]);
  }
}
