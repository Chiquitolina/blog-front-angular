import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly apiUrl = 'http://localhost:3000/trpc';

  private posts = signal<any[]>([]);
  private isLoadingPosts = signal<boolean>(false);

  private isLoadingSinglePost = signal<boolean>(false);

  private singlePost = signal<any>({});

  private categoryControl = signal<string>('Angular');
  private subcategoryControl = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  // Método para obtener la Signal de los posts
  getPosts() {
    return this.posts; // Devuelve la Signal
  }

  // Método para actualizar los posts
  setPosts(posts: any[]) {
    this.posts.set(posts); // Actualiza el valor de la Signal
  }

  getIsLoadingState() {
    return this.isLoadingPosts; // Devuelve la Signal
  }

  getIsLoadingSinglePostState() {
    return this.isLoadingPosts;
  }

  fetchPosts(): Observable<any> {
    this.isLoadingPosts.set(true);
    return this.http
      .get(`${this.apiUrl}/post.getAll`, {})
      .pipe(finalize(() => this.isLoadingPosts.set(false)));
  }

  fetchPostLimit(limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/post.getAllLimit?input=${limit}`);
  }

  createPost(post: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/post.create`, post );
  }

  getPostById(id: number): Observable<any> {
    this.isLoadingSinglePost.set(true);
    return this.http
      .get(`${this.apiUrl}/post.getById?input=${id}`)
      .pipe(finalize(() => this.isLoadingSinglePost.set(false)));
  }

  getPostByCategory(category: string, subcategory?: string): Observable<any> {
    this.isLoadingPosts.set(true);
    const payload: any = { categoria: category };

    // Agregar subcategoria solo si está definida.
    if (subcategory) {
      payload.subcategoria = subcategory;
    }

    return this.http
      .post(`${this.apiUrl}/filter.filter`, payload)
      .pipe(finalize(() => this.isLoadingPosts.set(false)));
  }
}
