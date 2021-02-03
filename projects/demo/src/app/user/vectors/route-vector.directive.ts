import { Route } from '@angular/compiler/src/core';
import { Directive } from '@angular/core';
import { VectorService } from './vector.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Directive({
  selector: '[appRouteVector]',
})
export class RouteVectorDirective {
  vectorNode$ = this.route.data.pipe(
    map((data) => this.vectorService.vectors.get(data.soul))
  );
  vector$: Observable<any> = this.vectorNode$.pipe(
    switchMap((node) => node.on())
  );
  constructor(
    protected vectorService: VectorService,
    private route: ActivatedRoute
  ) {}
}
