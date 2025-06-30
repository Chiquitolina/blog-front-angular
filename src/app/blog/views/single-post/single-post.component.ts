import { Component, Signal } from '@angular/core';
import { PostsService } from '../../../shared/services/posts/posts.service';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { PostsDisplayComponent } from '../../components/posts-display/posts-display.component';
import { RouterModule } from '@angular/router';
import { RatingModule } from 'primeng/rating';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'; // Importar FormsModule
import { catchError, of, switchMap } from 'rxjs';
import { ConfirmRatingDialogComponent } from '../../components/confirm-rating-dialog/confirm-rating-dialog.component';
import { PostRatingsService } from '../../../shared/services/postRatings/post-ratings.service';
import { LinkedinAuthService } from '../../../core/services/linkedin-auth/linkedin-auth.service';
import { RecentPostCarouselComponent } from '../../components/recent-post-carousel/recent-post-carousel.component';
import { CategoryService } from '../../../shared/services/categories/category.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  standalone: true,
  selector: 'app-single-post',
  imports: [
    MatIconModule,
    CommonModule,
    CardModule,
    PostsDisplayComponent,
    ConfirmRatingDialogComponent,
    RouterModule,
    RatingModule,
    ReactiveFormsModule,
    FormsModule,
    RecentPostCarouselComponent,
    MatProgressSpinnerModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.scss',
})
export class SinglePostComponent {
  isLoadingSinglePost!: Signal<boolean>;

  formGroup!: FormGroup;

  post: any;
  postRatingData: any;
  recentPosts: any;
  mostRankedCategories: any;

  isDialogVisible = false;

  constructor(
    private postServ: PostsService,
    private route: ActivatedRoute,
    private postRatingServ: PostRatingsService,
    private linkedinAuth: LinkedinAuthService,
    private categoryServ: CategoryService
  ) {
    this.isLoadingSinglePost = this.postServ.getIsLoadingState();
    // Suscribirse a los cambios en la URL para actualizar el post dinámicamente
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = Number(params.get('id'));
          if (isNaN(id)) return of(null); // Si el ID no es válido, devuelve un observable vacío

          return this.postServ.getPostById(id).pipe(
            catchError((err) => {
              console.error('Error al obtener el post', err);
              return of(null);
            })
          );
        }),
        switchMap((postData) => {
          if (!postData?.result?.data) return of(null); // Si no hay post, no buscar rating
          this.post = postData.result.data;
          console.log('POST:', this.post);
          console.log('POST ID:', this.post.id);
          return this.postRatingServ
            .getRatingById(postData.result.data.id)
            .pipe(
              catchError(() => of(null)) // Manejo de errores en la segunda llamada
            );
        })
      )
      .subscribe({
        next: (ratingData: any) => {
          this.postRatingData = ratingData?.result?.data;
          this.formGroup
            .get('rating')
            ?.setValue(this.postRatingData.averageRating);
        },
        error: (err) => console.error('Error en el stream:', err),
      });

    // Llamada para obtener los 5 posts más recientes
    this.postServ.fetchPostLimit(5).subscribe({
      next: (data) => {
        this.recentPosts = data.result.data;
      },
      error: (err) => {
        console.error('Error al obtener los posts recientes', err);
      },
    });

    this.formGroup = new FormGroup({
      rating: new FormControl(4),
    });

    this.categoryServ.getMostRanked().subscribe({
      next: (data: any) => {
        console.log(data);
        this.mostRankedCategories = data.result.data || [];
      },
      error: (error: Error) => {
        console.error('Error al obtener el ranking de categorías.', error);
      },
    });
  }

  openDialog() {
    this.isDialogVisible = true;
  }

  onDialogClosed() {
    this.isDialogVisible = false; // Resetea el estado cuando se cierra
  }

  fetchPostRating(postId: number) {
    this.postRatingServ.getRatingById(postId).subscribe({
      next: (data) => {},
      error: () => {},
    });
  }

  uploadRate() {
    this.postRatingServ.getRatingById(this.post.id).subscribe({
      next: (data: any) => {
        this.postRatingData = data?.result?.data;
        console.log('POST RATING DATA:', this.postRatingData);
        this.formGroup
          .get('rating')
          ?.setValue(this.postRatingData.averageRating);
      },
      error: () => {},
      complete: () => {
        this.postRatingServ.getIsFetchingPostLoader().set({ status: 'idle' });
      },
    });
  }

  compartirEnLinkedIn() {
    this.linkedinAuth.shareOnLinkedIn();
  }

  fetchMostRankedCategories() {
    this.categoryServ.getMostRanked().subscribe({
      next: (data: any) => {
        this.mostRankedCategories = data.result.data;
      },
      error: (error: Error) => {
        console.error('Error al obtener el ranking de categorías.', error);
      },
    });
  }
}
