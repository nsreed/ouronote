import { NgZone } from '@angular/core';
import { IGunStatic } from 'gun/types/static';
import { Observable } from 'rxjs';

export const GunRx = (ngZone: NgZone) => <T = any>(target: T) => {
  console.log('extending Gun');
  const chain = ((target as unknown) as IGunStatic).chain;
  if (chain === undefined) {
    console.error('gun chain was undefined on', target);
    return;
  }
  if ((chain as any).extended) {
    return;
  }
  (chain as any).extended = true;

  (chain as any).map$ = function (...args: any[]) {
    const g = this;
    if (args) {
      args = args.map((arg) => {
        if (typeof arg === 'function') {
          // console.log('pretty sure we found a callback', arg);
          return (...x: any) =>
            ngZone.run(() => {
              // console.log('used extension on()', x);
              return arg(...x);
            }, this);
        }
        return arg;
      });
    }
    return this.map(...args);
    // return g;
  };

  const oldOn = chain.on;
  (chain as any).on$ = function (...args: any[]) {
    const g = this;
    if (args) {
      args = args.map((arg) => {
        if (typeof arg === 'function') {
          // console.log('pretty sure we found a callback', arg);
          return (...x: any) =>
            ngZone.run(() => {
              // console.log('used extension on()', x);
              return arg(...x);
            }, this);
        }
        return arg;
      });
    }
    this.on(...args);
    return g;
  };

  const oldOnce = chain.once;
  (chain as any).once$ = function (...args: any[]) {
    if (args) {
      args = args.map((arg) => {
        if (typeof arg === 'function') {
          // console.log('pretty sure we found a callback', arg);
          return (...x: any) =>
            ngZone.run(() => {
              // console.log('used extension once()');
              return arg(...x);
            });
        }
        return arg;
      });
    }
    return this.once(...args);
  };
};
