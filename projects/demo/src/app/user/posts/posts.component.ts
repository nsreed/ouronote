import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from './post.service';
import * as Gun from 'gun';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts = this.postService.posts
    .reduce()
    .pipe(
      map((posts: any) =>
        posts.sort((a: any, b: any) => a._['>'].title - b._['>'].title)
      )
    );
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {}

  create() {
    this.postService.posts
      .set({
        title: 'untitled',
        body: '# Untitled\n',
      })
      .once()
      .subscribe((post: any) => {
        console.log('added post', post);
        this.router.navigate([
          '/user/posts',
          Gun.node.soul(post as any),
          'edit',
        ]);
      });
  }
}
