import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-splash-screen',
  imports: [],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss'
})
export class SplashScreenComponent implements OnInit {

  @Output() splashFinished = new EventEmitter<void>();
  animate = false;

  ngOnInit(): void {
     setTimeout(() => {
    this.animate = true; // activa puertas
  }, 1000);

  setTimeout(() => {
    this.splashFinished.emit(); // avisa al padre
  }, 2500); // tiempo suficiente para ver animación
  }
}
