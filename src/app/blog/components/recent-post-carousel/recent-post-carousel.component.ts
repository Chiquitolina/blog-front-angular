import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-recent-post-carousel',
  imports: [CarouselModule, CommonModule, MatIconModule],
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
