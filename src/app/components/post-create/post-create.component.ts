import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Router, RouterModule } from '@angular/router';
import { Post } from '../../core/models/post';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup;
  comments: { email: string; body: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
      userId: [1] // Default user ID for now
    });
  }

  ngOnInit(): void {}

  addComment(): void {
    this.comments.push({ email: '', body: '' });
  }

  removeComment(index: number): void {
    this.comments.splice(index, 1);
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const validComments = this.comments.filter(comment => 
        comment.email.trim() !== '' || comment.body.trim() !== ''
      );
      
      const postData = {
        ...this.postForm.value,
        comments: validComments
      };
      
      this.postService.createPost(postData).subscribe({
        next: (response: Post) => {
          console.log('Post created successfully', response);
          this.router.navigate(['/posts']);
        },
        error: (error: Error) => {
          console.error('Error creating post', error);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/posts']);
  }
}
