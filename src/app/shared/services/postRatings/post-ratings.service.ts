import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostRatingsService {
  private readonly apiUrl = 'http://localhost:3000/trpc';

  private isCreatingPostLoader = signal<{ status: 'idle' | 'loading' | 'finished', message?: string }>({ status: 'idle' });

  constructor(private http: HttpClient) {}

  getIsFetchingPostLoader() {
    return this.isCreatingPostLoader;
  }

  getRatingById(postId: number) {
    const input = encodeURIComponent(JSON.stringify({ postId }));
    return this.http.get(
      `${this.apiUrl}/postrating.getRatingByPost?input=${input}`
    );
  }

  createRatingPost(data: any): Observable<any> {
    this.isCreatingPostLoader.set({ status: 'loading' });
    return this.http
      .post(`${this.apiUrl}/postrating.create`, data)
      .pipe(finalize(() => this.isCreatingPostLoader.set({ status: 'finished', message: 'Post calificado correctamente.' })));
  }
}
