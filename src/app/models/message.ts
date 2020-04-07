import { Player } from 'src/app/models/player';

export interface Message {
  id: string;
  body: string;
  player: Player;
}
