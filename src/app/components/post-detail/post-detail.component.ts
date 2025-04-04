import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../core/models/post';
import { Comment } from '../../core/models/comment';
import { User } from '../../core/models/user';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  comments: Comment[] = [];
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private commentService: CommentService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));

    this.postService.getPost(postId).subscribe(post => {
      this.post = post;
      if (post) {
        this.userService.getUser(post.userId).subscribe(user => {
          this.user = user;
        });
      }
    });

    this.commentService.getPostComments(postId).subscribe(comments => {
      this.comments = comments;
    });
  }

  onUserClick(userId: number): void {
    console.log('Navigating to user profile:', userId);
    window.location.href = `/users/${userId}`;
  }
}
