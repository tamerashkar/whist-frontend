import * as Deck from 'deck-of-cards';

import {
  Output,
  Component,
  OnDestroy,
  ViewChild,
  ElementRef,
  EventEmitter,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DeckComponent implements OnDestroy, AfterViewInit {
  deck: any;

  @Output()
  cardDealt: EventEmitter<number> = new EventEmitter();

  @Output()
  cardsDealt: EventEmitter<void> = new EventEmitter();

  @ViewChild('container')
  container: ElementRef;

  mounted = false;

  constructor() {}

  ngAfterViewInit(): void {
    if (!this.deck) {
      this.deck = new Deck.default();
    }
  }

  ngOnDestroy() {
    this.hide();
  }

  show() {
    this.deck.mount(this.container.nativeElement);
    this.mounted = true;
  }

  hide() {
    if (this.mounted) {
      this.deck.unmount(this.container.nativeElement);
      this.mounted = false;
    }
  }

  shuffle() {
    this.deck.shuffle();
  }

  deal(positions: any) {
    const cards = 13;
    const delay = 0;
    const players = positions.length;
    const total = 13000;
    const duration = (total - delay) / (players * cards);
    const { x, y } = this.container.nativeElement.getBoundingClientRect();

    this.deck.cards.splice(players * cards, 52);
    this.deck.cards.forEach((card, i) => {
      card.animateTo({
        duration,
        delay: delay + i * duration,
        ease: 'quartOut',
        x: (positions[i % positions.length][0] - x) / 1,
        y: positions[i % positions.length][1] - y,
      });

      setTimeout(() => this.cardDealt.emit(i), delay + i * duration);
    });

    setTimeout(() => this.cardsDealt.emit(), total);
  }
}
