import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PostsService } from '../../../shared/services/posts/posts.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-post-management',
  imports: [TableModule, TagModule, RatingModule, CommonModule, ButtonModule],
  templateUrl: './post-management.component.html',
  styleUrl: './post-management.component.scss'
})
export class PostManagementComponent {

  posts: any = []



}
