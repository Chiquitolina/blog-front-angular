import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { MatIconModule } from '@angular/material/icon';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-recent-post-carousel',
  imports: [CarouselModule, CommonModule, MatIconModule, RatingModule, FormsModule],
  templateUrl: './recent-post-carousel.component.html',
  styleUrl: './recent-post-carousel.component.scss',
})
export class RecentPostCarouselComponent {
  @Input() recentPosts: any;

  responsiveOptions: any[] | undefined;

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
