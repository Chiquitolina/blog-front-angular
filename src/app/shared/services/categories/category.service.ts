import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMostRanked(): Observable<any> {
    return this.http.get(`${this.apiUrl}/category.getMostRanked`);
  }
}
