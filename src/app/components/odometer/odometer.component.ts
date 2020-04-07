import * as Odometer from 'odometer';

import {
  Input,
  OnChanges,
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-odometer',
  templateUrl: './odometer.component.html',
  styleUrls: ['./odometer.component.scss'],
})
export class OdometerComponent implements OnChanges, AfterViewInit {
  @Input()
  value: number;

  @ViewChild('odometer')
  odometerElement: ElementRef;

  odometer: Odometer;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.odometer && changes.value) {
      this.odometer.update(changes.value.currentValue);
    }
  }

  ngAfterViewInit() {
    this.odometer = new Odometer({
      el: this.odometerElement.nativeElement,
      value: this.value,
      duration: 1000,
      animation: 'slide',
      theme: 'minimal',
    });
  }
}
