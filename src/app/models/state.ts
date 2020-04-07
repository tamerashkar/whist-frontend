import { Whist } from 'src/app/models/whist';

export interface State {
  game: null | Whist;
}

export const InitialState = {
  game: null
};
