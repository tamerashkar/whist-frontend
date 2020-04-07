import {
  Input,
  OnInit,
  Component,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-dealer-chip',
  templateUrl: './dealer-chip.component.html',
  styleUrls: ['./dealer-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DealerChipComponent implements OnInit {
  @Input()
  fixed = true;

  constructor(public elementRef: ElementRef) {}

  ngOnInit(): void {
    if (!this.fixed) {
      this.elementRef.nativeElement.style.left = '-200px';
      this.elementRef.nativeElement.style.top = '-200px';
    }
  }

  moveTo(x: string, y: string) {
    this.elementRef.nativeElement.style.left = x;
    this.elementRef.nativeElement.style.top = y;
    this.elementRef.nativeElement.style.opacity = 1;
    setTimeout(() => (this.elementRef.nativeElement.style.opacity = 0), 300);
  }
}
