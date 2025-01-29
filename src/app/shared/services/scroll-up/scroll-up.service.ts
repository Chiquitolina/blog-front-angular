import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollUpService {

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd) // Filtramos eventos de navegación
      )
      .subscribe(() => {
        window.scrollTo(0, 0); // Desplazamos la página a la parte superior
      });
  }
  
}
