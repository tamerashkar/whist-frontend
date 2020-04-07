import {
  Input,
  OnInit,
  QueryList,
  Component,
  ViewChildren,
} from '@angular/core';

import { Player } from 'src/app/models/player';
import { CardComponent } from 'src/app/components/card/card.component';

@Component({
  selector: 'app-table-cards',
  templateUrl: './table-cards.component.html',
  styleUrls: ['./table-cards.component.scss'],
})
export class TableCardsComponent implements OnInit {
  @Input()
  players: Player[];

  @ViewChildren(CardComponent)
  cardsComponents: QueryList<CardComponent>;

  constructor() {}

  ngOnInit(): void {}
}
