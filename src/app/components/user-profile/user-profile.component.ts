import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../core/models/user';
import { Post } from '../../core/models/post';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  userPosts: Post[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getUser(userId).subscribe(user => {
      this.user = user;
    });

    this.postService.getUserPosts(userId).subscribe(posts => {
      this.userPosts = posts;
    });
  }

  onPostClick(id: number): void {
    this.router.navigate(['/posts', id]);
  }
}
