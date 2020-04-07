import {
  Input,
  OnInit,
  OnChanges,
  Component,
  ViewChild,
  ElementRef,
  SimpleChanges,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  state,
  style,
  trigger,
  animate,
  transition,
} from '@angular/animations';

import { Player } from 'src/app/models/player';
import { CardComponent } from 'src/app/components/card/card.component';
import { DealerChipComponent } from 'src/app/components/dealer-chip/dealer-chip.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('card', [
      state(
        'winner',
        style({
          transform: 'scale(1.25)',
          opacity: 1,
          height: '*',
        })
      ),
      transition('* => winner', [
        animate(
          '300ms 300ms cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1.25)', opacity: 1 })
        ),
      ]),
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }), // initial
        animate(
          '300ms cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, height: '*' }),
        animate(
          '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)',
            opacity: 0,
            height: '0px',
            margin: '0px',
          })
        ),
      ]),
    ]),
    trigger('chip', [
      state(
        'winner',
        style({
          transform: 'scale(1.75) rotate({{rotate}}deg) rotateX(360deg)',
          opacity: 1,
          height: '*',
        }),
        { params: { rotate: 0 } }
      ),
      transition('* => winner', [
        animate(
          '1s 300ms cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(1.75)  rotate({{rotate}}deg) rotateX(360deg)',
            opacity: 1,
          })
        ),
      ]),
      state(
        '',
        style({
          transform: 'scale(1) rotate({{rotate}}deg)',
          opacity: 1,
          height: '*',
        }),
        { params: { rotate: 0 } }
      ),
      transition(
        ':enter',
        [
          style({ transform: 'scale(0.5)  rotate(0deg)', opacity: 0 }), // initial
          animate(
            '300ms cubic-bezier(.8, -0.6, 0.2, 1.5)',
            style({ transform: 'scale(1) rotate({{rotate}}deg)', opacity: 1 })
          ),
        ],
        { params: { rotate: 0 } }
      ),
      transition(':leave', [
        style({ opacity: 1, height: '*' }),
        animate(
          '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({
            transform: 'scale(0.5)',
            opacity: 0,
            height: '0px',
            margin: '0px',
          })
        ),
      ]),
    ]),
  ],
})
export class PlayerComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  seat: 'bottom' | 'right' | 'top' | 'left';

  rotations = {
    bottom: 0,
    top: 180,
    left: -90,
    right: 90,
  };

  @Input()
  player: Player;

  @Input()
  active: Player;

  @Input()
  dealer: boolean;

  @Input()
  dealerChip: DealerChipComponent;

  @Input()
  bidding = false;

  @Input()
  showBack = false;

  @ViewChild(DealerChipComponent)
  dealerChipPlaceholder: DealerChipComponent;

  @ViewChild('handWins')
  handWins: ElementRef;

  @ViewChild('card')
  card: ElementRef;

  @ViewChild('cardsPlaceholder')
  cardsPlaceholder: CardComponent;

  rotate = 0;
  @Input()
  test = false;

  constructor(protected elementRef: ElementRef) {}

  ngOnInit(): void {
    this.rotate = this.rotations[this.seat];
  }

  get showBid() {
    if (this.player.bid === null) {
      return false;
    }

    return this.bidding || this.player.bidWinner;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dealer) {
      this.moveDealerChip();
    }
  }

  ngAfterViewInit() {
    this.moveDealerChip();
  }

  moveDealerChip() {
    if (this.dealer && this.dealerChip && this.dealerChipPlaceholder) {
      const [x, y] = this.getDealerChipPlaceholderPosition();
      this.dealerChip.moveTo(`${x}px`, `${y}px`);
    }
  }

  getDealerChipPlaceholderPosition() {
    const {
      x,
      y,
    } = this.dealerChipPlaceholder.elementRef.nativeElement.getBoundingClientRect();
    return [x, y];
  }

  getCardPosition() {
    const { x, y } = this.cardsPlaceholder.getCardCenterPosition();
    return [x, y];
  }

  getCardsPlaceholderPosition() {
    const { x, y } = this.cardsPlaceholder.getCardCenterPosition();
    return [x, y];
  }

  getHandWinsPosition() {
    const el = this.dealerChipPlaceholder.elementRef.nativeElement;
    const x = el.offsetLeft - el.scrollLeft + el.clientLeft;
    const y = el.offsetTop - el.scrollTop + el.clientTop;
    return [x, y];
  }
}
