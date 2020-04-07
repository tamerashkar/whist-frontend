import { Suit } from 'src/app/models/suit';
import { Player } from 'src/app/models/player';
import { WhistStatus } from 'src/app/models/whist-status';

export interface Whist {
  id: string;
  host: string;
  dealer: string;
  turn: number;
  event: string;
  status: WhistStatus;
  homeTeamPoints: number;
  guestTeamPoints: number;
  trumpSuit: Suit;
  players: Player[];
}
