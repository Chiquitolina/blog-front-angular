import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkedinAuthService } from '../../core/services/linkedin-auth/linkedin-auth.service';
import { switchMap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-linkedin-callback',
  imports: [],
  templateUrl: './linkedin-callback.component.html',
  styleUrl: './linkedin-callback.component.scss',
})
export class LinkedinCallbackComponent {
  constructor(
    private route: ActivatedRoute,
    private linkedinService: LinkedinAuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          const code = params['code'];
          const state = params['state'];
  
          if (code && state) {
            console.log('Authorization Code:', code);
            console.log('State:', state);
  
            // Obtener el access token
            return this.linkedinService.getAccessToken(code);
          } else {
            console.error('No se recibió el código de autorización');
            throw new Error('No se recibió el código de autorización');
          }
        }),
        switchMap((data) => {
          const accessToken = data.result.data.accessToken;
          console.log('Access Token:', accessToken);
  
          // Ahora obtenemos el perfil del usuario
          return this.linkedinService.getUserProfile(accessToken);
        })
      )
      .subscribe({
        next: (profile) => {
          console.log('Perfil de LinkedIn:', profile);
          const userId = profile.id;
          console.log('User ID:', userId);
  
          // Puedes manejar el perfil como necesites aquí
        },
        error: (error) => {
          console.error('Error al obtener el perfil:', error);
        }
      });
  }
}
