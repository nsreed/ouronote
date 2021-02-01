import { Directive } from '@angular/core';
import { PostService } from './post.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appRoutePost]',
})
export class RoutePostDirective {
  post$: Observable<any> = this.route.data.pipe(
    switchMap((data) => this.postService.posts.get(data.soul).on())
  );
  constructor(
    protected postService: PostService,
    private route: ActivatedRoute
  ) {}
}
