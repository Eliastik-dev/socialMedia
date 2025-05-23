import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PostCreateComponent } from './components/post-create/post-create.component';

export const routes: Routes = [
  { path: 'posts', component: PostListComponent },
  { path: 'posts/create', component: PostCreateComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'users/:id', component: UserProfileComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' }
];
