import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl = 'http://localhost:3000/trpc';

  constructor(private http: HttpClient) {}

  getMostRanked(): Observable<any> {
    return this.http.get(`${this.apiUrl}/category.getMostRanked`);
  }
}
