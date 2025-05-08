import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CommonModule } from '@angular/common';
import { PostsDisplayComponent } from '../../components/posts-display/posts-display.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { PostRatingsService } from '../../../shared/services/postRatings/post-ratings.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    AvatarModule,
    AvatarGroupModule,
    PostsDisplayComponent,
    CommonModule,
    HeaderComponent,
    CarouselModule,
    RatingModule,
    FormsModule,
    TooltipModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  mostRatedPostByCategory: any;
  responsiveOptions: any[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private postRatingServ: PostRatingsService
  ) {}

  ngAfterViewInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        document
          .getElementById(fragment)
          ?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

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

    this.postRatingServ.getMostRatedPostByCategory().subscribe({
      next: (data) => {
        this.mostRatedPostByCategory = data.result.data;
      },
      error: (error) => {
        console.error('Error al obtener los posts:', error);
      },
    });
    
  }
}
