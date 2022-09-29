import {
  ContentChildren,
  Directive,
  Injectable,
  OnDestroy,
  ViewChildren,
} from '@angular/core';
import * as paper from 'paper';
import { PaperDirective } from './paper.directive';
import { AfterViewInit } from '@angular/core';

@Injectable()
export class PaperScope {
  constructor() {}
}

@Directive({
  selector: '[appPaperScope]',
  providers: [
    {
      provide: PaperScope,
      useFactory: () => {
        const ps = new PaperScope();
        paper.install(ps);
        return ps;
      },
      multi: false,
    },
  ],
})
export class PaperScopeDirective implements AfterViewInit, OnDestroy {
  constructor(private ps: PaperScope) {}
  ngAfterViewInit(): void {
    console.log(this.secrets);
  }
  ngOnDestroy(): void {}
  private get secrets() {
    const { _id, _scopes } = (this.ps as any).initialize;
    return { _id, _scopes };
  }
}
