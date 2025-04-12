import { Component, Signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { PostItemComponent } from '../post-item/post-item.component';
import { PostsService } from '../../../shared/services/posts/posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MenuService } from '../../../core/services/menu/menu.service';
@Component({
  selector: 'app-posts-display',
  imports: [CarouselModule, PostItemComponent, MatProgressSpinnerModule],
  templateUrl: './posts-display.component.html',
  styleUrl: './posts-display.component.scss',
})
export class PostsDisplayComponent {
  isLoading!: Signal<boolean>;

  constructor(private postServ: PostsService, public menuServ: MenuService) {
    this.isLoading = this.postServ.getIsLoadingState();

    this.postServ.fetchPosts().subscribe({
      next: (data) => {
        this.postServ.setPosts(data.result.data);
      },
      error: (error: HttpErrorResponse) => {},
      complete: () => {
      },
    });
  }

  get posts() {
    return this.postServ.getPosts();
  }
}
