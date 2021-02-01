import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostResolver } from './post.resolver';
import { ViewPostComponent } from './view-post/view-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    children: [
      {
        path: ':soul',
        component: ViewPostComponent,
        resolve: {
          soul: PostResolver,
        },
      },
      {
        path: ':soul/edit',
        component: EditPostComponent,
        resolve: {
          soul: PostResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
