import {
  Input,
  OnInit,
  Component,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Suit } from 'src/app/models/suit';
import { Card } from 'src/app/models/card';
import { style, animate, trigger, transition } from '@angular/animations';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('chip', [
      transition(':enter', [
        style({ transform: 'scale(0.5)' }),
        animate(
          '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)' })
        ),
      ]),
    ]),
  ],
})
export class TeamComponent implements OnInit {
  @Input()
  name: string;

  @Input()
  score: number;

  @Input()
  bid: number;

  @Input()
  hands: number;

  @Input()
  trumpSuit: Suit;

  @Input()
  @HostBinding('class.inverse')
  inverse: boolean;

  constructor() {}

  ngOnInit(): void {}

  get card(): Card {
    return { value: 2, suit: this.trumpSuit };
  }
}
