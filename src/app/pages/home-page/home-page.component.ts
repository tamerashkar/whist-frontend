import {
  state,
  style,
  trigger,
  animate,
  keyframes,
  transition,
} from '@angular/animations';

import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('flip', [
      state(
        'front',
        style({
          transform: 'rotateY(0deg)',
        })
      ),
      state(
        'back',
        style({
          transform: 'rotateY(180deg)',
        })
      ),
      transition('front => back', [
        animate(
          '1s 0s ease-out',
          keyframes([
            style({
              transform: 'perspective(400px) rotateY(0deg)',
              offset: 0,
            }),
            style({
              transform:
                'perspective(400px) scale3d(1.5, 1.5, 1.5) rotateY(80deg)',
              offset: 0.4,
            }),
            style({
              transform:
                'perspective(400px) scale3d(1.5, 1.5, 1.5) rotateY(100deg)',
              offset: 0.5,
            }),
            style({
              transform:
                'perspective(400px) scale3d(0.95, 0.95, 0.95) rotateY(180deg)',
              offset: 0.8,
            }),
            style({
              transform: 'perspective(400px) scale3d(1, 1, 1) rotateY(180deg)',
              offset: 1,
            }),
          ])
        ),
      ]),
      transition('back => front', [
        animate(
          '1s 0s ease-in',
          keyframes([
            style({
              transform: 'perspective(400px) rotateY(0deg)',
              offset: 0,
            }),
            style({
              transform:
                'perspective(400px) scale3d(1.5, 1.5, 1.5) rotateY(-80deg)',
              offset: 0.4,
            }),
            style({
              transform:
                'perspective(400px) scale3d(1.5, 1.5, 1.5) rotateY(-100deg)',
              offset: 0.5,
            }),
            style({
              transform:
                'perspective(400px) scale3d(0.95, 0.95, 0.95) rotateY(-180deg)',
              offset: 0.8,
            }),
            style({
              transform: 'perspective(400px) scale3d(1, 1, 1) rotateY(-180deg)',
              offset: 1,
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class HomePageComponent implements OnInit {
  chip$ = new BehaviorSubject('front');
  fan$ = new BehaviorSubject(false);

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => this.chip$.next('back'), 300);
    setTimeout(() => this.fan$.next(true), 300);
  }
}
