import { Card } from 'src/app/models/card';

export interface Player {
  id: string;
  name: string;
  team: number;
  robot: boolean;
  turn: number;
  dealer: boolean;
  bid: null | number;
  bidWinner: boolean;
  handWinner: boolean;
  handWins: number;
  card: null | Card;
}
