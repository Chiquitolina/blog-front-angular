import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ScrollUpService } from './shared/services/scroll-up/scroll-up.service';
import { filter } from 'rxjs';
import { SplashScreenComponent } from './shared/components/splash-screen/splash-screen.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent, SplashScreenComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'devtacora';
 splashHidden = false;

  onSplashFinished() {
    this.splashHidden = true;
  }

  scrollUpServ = inject(ScrollUpService)

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngAfterViewInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Retrasar el scroll para esperar que la vista dentro de router-outlet se renderice
        setTimeout(() => {
          const fragment = this.route.snapshot.fragment;
          if (fragment) {
            const element = document.getElementById(fragment);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }, 500); // Esperar un poco para asegurarse de que el DOM esté listo
      });
  }
}
