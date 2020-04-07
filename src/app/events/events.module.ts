import { Init } from 'src/app/events/init';
import { NgModule, InjectionToken } from '@angular/core';
import { PlayerHasBid } from 'src/app/events/player-has-bid';
import { HandHasEnded } from 'src/app/events/hand-has-ended';
import { GameHasEnded } from 'src/app/events/game-has-ended';
import { RoundHasEnded } from 'src/app/events/round-has-ended';
import { CardsWereDealt } from 'src/app/events/cards-were-dealt';
import { GameHasStarted } from 'src/app/events/game-has-started';
import { HandHasStarted } from 'src/app/events/hand-has-started';
import { RoundHasStarted } from 'src/app/events/round-has-started';
import { BidWasRequested } from 'src/app/events/bid-was-requested';
import { BiddingHasEnded } from 'src/app/events/bidding-has-ended';
import { CardWasRequested } from 'src/app/events/card-was-requested';
import { HandWasRequested } from 'src/app/events/hand-was-requested';
import { BiddingHasStarted } from 'src/app/events/bidding-has-started';
import { DealerWasSelected } from 'src/app/events/dealer-was-selected';
import { RoundWasRequested } from 'src/app/events/round-was-requested';
import { PlayerHasLeftTeam } from 'src/app/events/player-has-left-team';
import { PlayerHasJoinedTeam } from 'src/app/events/player-has-joined-team';
import { PlayerHasPlayedCard } from 'src/app/events/player-has-played-card';
import { CreditsWereRequested } from 'src/app/events/credits-were-requested';
import { BidWinnerWasSelected } from 'src/app/events/bid-winner-was-selected';
import { TrumpSuitWasSelected } from 'src/app/events/trump-suit-was-selected';
import { PlayerHasJoinedLobby } from 'src/app/events/player-has-joined-lobby';
import { HandWinnerWasSelected } from 'src/app/events/hand-winner-was-selected';
import { GameWinnerWasSelected } from 'src/app/events/game-winner-was-selected';
import { RoundWinnerWasSelected } from 'src/app/events/round-winner-was-selected';

export const EVENTS = new InjectionToken('EVENTS');

export const events = [
  BiddingHasEnded,
  BiddingHasStarted,
  BidWasRequested,
  BidWinnerWasSelected,
  CardsWereDealt,
  CardWasRequested,
  CreditsWereRequested,
  DealerWasSelected,
  Init,
  GameHasEnded,
  GameHasStarted,
  GameWinnerWasSelected,
  HandHasEnded,
  HandHasStarted,
  HandWasRequested,
  HandWinnerWasSelected,
  PlayerHasBid,
  PlayerHasJoinedLobby,
  PlayerHasJoinedTeam,
  PlayerHasLeftTeam,
  PlayerHasPlayedCard,
  RoundHasEnded,
  RoundHasStarted,
  RoundWasRequested,
  RoundWinnerWasSelected,
  TrumpSuitWasSelected,
];

export const providers = events.map((event) => ({
  provide: EVENTS,
  useExisting: event,
  multi: true,
}));

@NgModule({
  providers: [...events, ...providers],
})
export class EventsModule {}
