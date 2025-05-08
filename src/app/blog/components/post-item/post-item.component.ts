import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { MatIconModule } from '@angular/material/icon';
import { RatingModule } from 'primeng/rating';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar FormsModule
import { TooltipModule } from 'primeng/tooltip';

@Component({
  standalone: true,
  selector: 'app-post-item',
  imports: [
    DatePipe,
    RouterModule,
    CardModule,
    MatIconModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule
  ],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss',
})
export class PostItemComponent {
  formGroup!: FormGroup;

  @Input() post: any;

  constructor() {
    this.formGroup = new FormGroup({
      value: new FormControl(4),
    });
  }
}
