// @source https://github.com/jiayihu/ng-animate/blob/master/projects/ng-animate/src/lib/fading.ts
import { style, animate, keyframes, animation } from '@angular/animations';

export const DEFAULT_ANIMATION_TIMING = 0.5;

export function transformAxis(axis: 'x' | 'y', name: string) {
  return function(letter: string): string {
    return axis === 'x'
      ? `${name}({{ ${letter} }}, 0, 0)`
      : `${name}(0, {{ ${letter} }}, 0)`;
  };
}

export function fadeInX(a, b) {
  return animation(
    animate(
      '{{ timing }}s {{ delay }}s',
      keyframes([
        style({
          opacity: 0,
          transform: 'translate3d({{ a }}, 0, 0)',
          offset: 0
        }),
        style({
          opacity: 1,
          transform: 'translate3d({{ b }}, 0, 0)',
          offset: 1
        })
      ])
    ),
    { params: { timing: DEFAULT_ANIMATION_TIMING, delay: 0, a, b } }
  );
}

export function fadeInY(a, b) {
  return animation(
    animate(
      '{{ timing }}s {{ delay }}s',
      keyframes([
        style({
          opacity: 0,
          transform: 'translate3d(0, {{ a }}, 0)',
          offset: 0
        }),
        style({
          opacity: 1,
          transform: 'translate3d(0, {{ b }}, 0)',
          offset: 1
        })
      ])
    ),
    { params: { timing: DEFAULT_ANIMATION_TIMING, delay: 0, a, b } }
  );
}

export const fadeIn = fadeInX(0, 0);
export const fadeInDown = fadeInY('-100%', 0);
export const fadeInUp = fadeInY('100%', 0);
export const fadeInLeft = fadeInX('-100%', 0);
export const fadeInRight = fadeInX('100%', 0);

export function fadeOutX(a, b) {
  return animation(
    animate(
      '{{ timing }}s {{ delay }}s',
      keyframes([
        style({
          opacity: 1,
          transform: 'translate3d({{ a }}, 0, 0)',
          offset: 0
        }),
        style({
          opacity: 0,
          transform: 'translate3d({{ b }}, 0, 0)',
          offset: 1
        })
      ])
    ),
    { params: { timing: DEFAULT_ANIMATION_TIMING, delay: 0, a, b } }
  );
}

export function fadeOutY(a, b) {
  return animation(
    animate(
      '{{ timing }}s {{ delay }}s',
      keyframes([
        style({
          opacity: 1,
          transform: 'translate3d(0, {{ a }}, 0)',
          offset: 0
        }),
        style({
          opacity: 0,
          transform: 'translate3d(0, {{ b }}, 0)',
          offset: 1
        })
      ])
    ),
    { params: { timing: DEFAULT_ANIMATION_TIMING, delay: 0, a, b } }
  );
}

export const fadeOut = fadeOutX(0, 0);
export const fadeOutDown = fadeOutY('-100%', 0);
export const fadeOutUp = fadeOutY('100%', 0);
export const fadeOutLeft = fadeOutX('-100%', 0);
export const fadeOutRight = fadeOutX('100%', 0);

export function slideX(a, b) {
  return animation(
    animate(
      '{{ timing }}s {{ delay }}s',
      keyframes([
        style({
          transform: 'translate3d({{ a }}, 0, 0)',
          offset: 0
        }),
        style({
          transform: 'translate3d({{ b }}, 0, 0)',
          offset: 1
        })
      ])
    ),
    { params: { timing: DEFAULT_ANIMATION_TIMING, delay: 0, a, b } }
  );
}

export function slideY(a, b) {
  return animation(
    animate(
      '{{ timing }}s {{ delay }}s',
      keyframes([
        style({
          transform: 'translate3d(0, {{ a }}, 0)',
          offset: 0
        }),
        style({
          transform: 'translate3d(0, {{ b }}, 0)',
          offset: 1
        })
      ])
    ),
    { params: { timing: DEFAULT_ANIMATION_TIMING, delay: 0, a, b } }
  );
}

export const slideInUp = slideY('-100%', 0);
export const slideInDown = slideY('100%', 0);
export const slideInLeft = slideX('-100%', 0);
export const slideInRight = slideX('100%', 0);
export const slideOutUp = slideY(0, '-100%');
export const slideOutDown = slideY(0, '100%');
export const slideOutLeft = slideX(0, '-100%');
export const slideOutRight = slideX(0, '100%');
