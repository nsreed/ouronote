import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { RoutePostDirective } from '../route-post.directive';
import { PostService } from '../post.service';

@Component({
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent extends RoutePostDirective implements OnInit {
  postForm = this.fb.group({
    title: [null, Validators.required],
    body: [null, Validators.required],
  });

  constructor(
    postService: PostService,
    route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super(postService, route);
    this.post$.subscribe((m) => {
      this.postForm.patchValue(m, { onlySelf: true, emitEvent: false });
    });
    this.postForm.valueChanges.subscribe((vc) => {
      this.post$.pipe(take(1)).subscribe((m) => {
        this.postService.posts.get(m).put(vc);
      });
    });
  }
  ngOnInit(): void {}
}
