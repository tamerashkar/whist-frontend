import {
  Input,
  OnInit,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipComponent implements OnInit {
  @Input()
  value: string | number;

  constructor() {}

  ngOnInit(): void {}
}
