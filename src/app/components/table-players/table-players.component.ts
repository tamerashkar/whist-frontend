import { Player } from 'src/app/models/player';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-players',
  templateUrl: './table-players.component.html',
  styleUrls: ['./table-players.component.scss']
})
export class TablePlayersComponent implements OnInit {
  @Input()
  players: Player[];

  seats = ['bottom', 'right', 'top', 'left'];

  constructor() {}

  ngOnInit(): void {}

  trackPlayerBy(index, player) {
    return player.id;
  }
}
