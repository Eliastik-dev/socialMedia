import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../core/models/post';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
      }
    });
  }

  onPostClick(id: number): void {
    console.log('Navigating to post detail:', id);
    this.router.navigate(['/posts', id]);
  }

  navigateToCreatePost(): void {
    console.log('Navigating to create post page');
    setTimeout(() => {
      this.router.navigate(['/posts/create']);
    }, 0);
  }
}
