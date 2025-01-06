import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { PostItemComponent } from '../post-item/post-item.component';

@Component({
  selector: 'app-posts-display',
  imports: [CarouselModule, PostItemComponent],
  templateUrl: './posts-display.component.html',
  styleUrl: './posts-display.component.scss'
})
export class PostsDisplayComponent {

}
