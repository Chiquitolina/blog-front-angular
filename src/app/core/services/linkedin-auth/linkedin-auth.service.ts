import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LinkedinAuthService {
  private clientId = '77iqo5a1iv52pi';
  private redirectUri = 'http://localhost:4200/auth/linkedin/callback';
  private state = 'random123';
  private scope = 'openid profile email w_member_social';

  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:3000/trpc';

  shareOnLinkedIn() {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${
      this.clientId
    }&redirect_uri=${encodeURIComponent(this.redirectUri)}&state=${
      this.state
    }&scope=${this.scope}`;
    window.location.href = authUrl;
  }

  getAccessToken(code: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/linkedin.getAccessToken?input=${encodeURIComponent(
        JSON.stringify({ code })
      )}`
    );
  }

  getUserProfile(accessToken: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/linkedin.getUserProfile`, {
      input: { accessToken },
    });
  }
}
