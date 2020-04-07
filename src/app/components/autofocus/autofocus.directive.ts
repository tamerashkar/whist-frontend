import { Input, Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  @Input() appAutoFocus: boolean;

  constructor(protected el: ElementRef) {}

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
}
