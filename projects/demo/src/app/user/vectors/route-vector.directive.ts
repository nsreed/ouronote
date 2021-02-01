import { Route } from '@angular/compiler/src/core';
import { Directive } from '@angular/core';
import { VectorService } from './vector.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Directive({
  selector: '[appRouteVector]',
})
export class RouteVectorDirective {
  vector$: Observable<any> = this.route.data.pipe(
    switchMap((data) => this.vectorService.vectors.get(data.soul).on())
  );
  constructor(
    protected vectorService: VectorService,
    private route: ActivatedRoute
  ) {}
}
