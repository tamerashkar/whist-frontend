import {
  Input,
  OnInit,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

export interface Bid {
  amount: number;
  label: string;
}

const Bids = [
  { label: '7', amount: 7 },
  { label: '8', amount: 8 },
  { label: '9', amount: 9 },
  { label: '10', amount: 10 },
  { label: '11', amount: 11 },
  { label: '12', amount: 12 },
  { label: '13', amount: 13 },
  { label: 'PASS', amount: 0 },
];

@Component({
  selector: 'app-bidder',
  templateUrl: './bidder.component.html',
  styleUrls: ['./bidder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BidderComponent implements OnInit {
  @Input()
  minimum: number;

  @Output()
  bidSelected: EventEmitter<Bid> = new EventEmitter();

  bids: Bid[] = Bids;

  constructor() {}

  ngOnInit(): void {}

  onSelectBid(bid: Bid) {
    this.bidSelected.emit(bid);
  }
}
