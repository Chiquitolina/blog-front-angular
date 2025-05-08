import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { PostsService } from '../../../shared/services/posts/posts.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  standalone: true,
  selector: 'app-write-post',
  imports: [
    EditorModule,
    FormsModule,
    FloatLabel,
    InputTextModule,
    TextareaModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule
  ],
  templateUrl: './write-post.component.html',
  styleUrl: './write-post.component.scss',
})
export class WritePostComponent {
  postForm!: FormGroup;

  constructor(private postServ: PostsService) {
    this.postForm = new FormGroup({
      titulo: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      subcategoria: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      contenido: new FormControl('', Validators.required),
      lenguaje: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    console.log(this.postForm.value)
    if (this.postForm.valid) {
      this.postServ.createPost(this.postForm.value).subscribe({
        next: (response) => {
          console.log('Post creado con éxito:', response);
          this.postForm.reset();
        },
        error: (error) => {
          console.error('Error al crear el post:', error);
        },
      });
    } else {
      console.log('Formulario inválido');
      this.postForm.markAllAsTouched();
    }
  }
}
