import { Component } from '@angular/core';
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

@Component({
  selector: 'app-single-post',
  imports: [
    MatIconModule,
    CommonModule,
    CardModule,
    PostsDisplayComponent,
    RouterModule,
    RatingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.scss',
})
export class SinglePostComponent {
  formGroup!: FormGroup;

  post: any;
  recentPosts: any;

  constructor(private postServ: PostsService, private route: ActivatedRoute) {
    // Suscribirse a los cambios en la URL para actualizar el post dinámicamente
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = Number(params.get('id'));
          if (isNaN(id)) return of(null); // Si el ID no es válido, devuelve un observable vacío
          return this.postServ.getPostById(id).pipe(
            catchError((err) => {
              console.error('Error al obtener el post', err);
              return of(null); // Devuelve un observable vacío en caso de error
            })
          );
        })
      )
      .subscribe({
        next: (data) => {
          this.post = data?.result?.data || null;
        },
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
      value: new FormControl(4),
    });
  }
}
