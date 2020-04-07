import {
  state,
  style,
  animate,
  trigger,
  transition,
} from '@angular/animations';

import {
  Input,
  Output,
  Component,
  OnChanges,
  ElementRef,
  HostBinding,
  EventEmitter,
  HostListener,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Card } from 'src/app/models/card';
import { Suit } from 'src/app/models/suit';
import { WhistService } from 'src/app/services/whist.service';

export const CARD_VALUES = {
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: 'J',
  12: 'Q',
  13: 'K',
  14: 'A',
};

export const CARD_SUITS = {
  [Suit.Club]: '♣',
  [Suit.Heart]: '♥',
  [Suit.Spade]: '♠',
  [Suit.Diamond]: '♦',
};

export const SUIT_PLACEMENTS = {
  2: [
    [false, false, false, false],
    [true, false, true],
    [false, false, false, false],
  ],
  3: [
    [false, false, false, false],
    [true, true, true],
    [false, false, false, false],
  ],
  4: [
    [true, false, false, true],
    [false, false, false],
    [true, false, false, true],
  ],
  5: [
    [true, false, false, true],
    [false, true, false],
    [true, false, false, true],
  ],
  6: [
    [true, true, -1, true],
    [false, false, false],
    [true, true, -1, true],
  ],
  7: [
    [true, true, -1, true],
    [true, -1, false],
    [true, true, -1, true],
  ],
  8: [
    [true, true, -1, true],
    [true, -1, true],
    [true, true, -1, true],
  ],
  9: [
    [true, true, true, true],
    [false, true, false],
    [true, true, true, true],
  ],
  10: [
    [true, true, true, true],
    [true, -1, true],
    [true, true, true, true],
  ],
  11: [
    [false, false, false, false],
    [false, false, false],
    [false, false, false, false],
  ],
  12: [
    [false, false, false, false],
    [false, false, false],
    [false, false, false, false],
  ],
  13: [
    [false, false, false, false],
    [false, false, false],
    [false, false, false, false],
  ],
  14: [
    [false, false, false, false],
    [false, true, false],
    [false, false, false, false],
  ],
  '': [
    [false, false, false, false],
    [false, false, false],
    [false, false, false, false],
  ],
};

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('hover', [
      state(
        'hovering',
        style({
          transform: 'translateY(-24px)',
        })
      ),
      transition('default => hovering', [animate('0.3s')]),
    ]),
    trigger('select', [
      state('unselected', style({})),
      state(
        'selected',
        style({
          top: '{{translateY}}px',
          left: '{{translateX}}px',
          transform: 'unset',
          'transform-origin': 'unset',
        }),
        { params: { translateX: 0, translateY: 0 } }
      ),
      transition('unselected <=> selected', [animate('0.3s')]),
    ]),
  ],
})
export class CardComponent implements OnChanges, AfterViewInit {
  translateX = 0;

  translateY = 0;

  @Input()
  card: Card;

  @Input()
  cardPlayable: boolean;

  @HostBinding('@select')
  selectedTrigger = {
    value: 'unselected',
    params: {
      translateX: this.translateX,
      translateY: this.translateY,
    },
  };

  @Input()
  set selected(bool) {
    this.selectedTrigger = {
      value: bool ? 'selected' : 'unselected',
      params: {
        translateX: this.translateX,
        translateY: this.translateY,
      },
    };
  }

  @Input()
  @HostBinding('class.card-back')
  back: boolean;

  @Input()
  @HostBinding('class.card-suit-only')
  suitOnly: boolean;

  @Output()
  cardSelected: EventEmitter<Card> = new EventEmitter();

  @Output()
  cardPlayed: EventEmitter<Card> = new EventEmitter();

  hovering = 'default';
  hovering$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  placements;

  suits = Object.values(Suit);

  constructor(
    public elementRef: ElementRef,
    protected whistService: WhistService
  ) {}

  ngOnChanges(): void {
    this.placements = SUIT_PLACEMENTS[this.card ? this.card.value : ''];
  }

  ngAfterViewInit() {}

  get value() {
    return this.card ? CARD_VALUES[this.card.value] : '';
  }

  get faceCard() {
    return this.value === 'J' || this.value === 'Q' || this.value === 'K';
  }

  get suitName() {
    return this.card ? this.card.suit : '';
  }

  get suit() {
    return this.card ? CARD_SUITS[this.card.suit] : '';
  }

  get club() {
    return this.suitName === Suit.Club;
  }

  get heart() {
    return this.suitName === Suit.Heart;
  }

  get spade() {
    return this.suitName === Suit.Spade;
  }

  get diamond() {
    return this.suitName === Suit.Diamond;
  }

  get trigger() {
    if (this.cardPlayable && this.hovering$.getValue()) {
      return {
        value: 'hovering',
        params: {
          translateX: this.translateX,
        },
      };
    }
    return {
      value: this.selectedTrigger ? 'selected' : 'unselected',
      params: {
        translateX: this.translateX,
      },
    };
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.hovering = 'hovering';
    this.hovering$.next(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hovering = 'default';
    this.hovering$.next(false);
  }

  onSelect() {
    this.hovering$.next(false);

    setTimeout(() => {
      if (this.cardPlayable) {
        const card = this.whistService.container.tableComponent.tableCardsComponent.cardsComponents.toArray()[0];
        const {
          y,
          left,
        } = card.elementRef.nativeElement.getBoundingClientRect();

        this.translateX = left;
        this.translateY = y;

        this.cardSelected.emit(this.card);
      }
    });
  }

  @HostListener('@select.done', ['$event'])
  onSelected(event) {
    if (this.cardPlayable && event.toState === 'selected') {
      this.cardPlayed.emit(this.card);
    }
  }

  getCardCenterPosition() {
    const {
      x,
      y,
      width,
      height,
    } = this.elementRef.nativeElement.getBoundingClientRect();
    return { x: x + width / 2, y: y + height / 2 };
  }

  getFacedSuitImagePath(value: string, suit: string) {
    return `assets/images/${value}.svg`;
  }

  move(x: number, y: number) {
    const pos = this.getCardCenterPosition();
    this.elementRef.nativeElement.style.left = `${x - pos.x}px`;
    this.elementRef.nativeElement.style.top = `${y - pos.y}px`;
  }
}
