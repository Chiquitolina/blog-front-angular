import {
  Component,
  EventEmitter,
  Input,
  Output,
  Signal,
  SimpleChanges,
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { PostRatingsService } from '../../../shared/services/postRatings/post-ratings.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  standalone: true,
  selector: 'app-confirm-rating-dialog',
  imports: [
    DialogModule,
    RatingModule,
    ReactiveFormsModule,
    ButtonModule,
    MatProgressSpinnerModule,
    LottieComponent,
  ],
  templateUrl: './confirm-rating-dialog.component.html',
  styleUrl: './confirm-rating-dialog.component.scss',
})
export class ConfirmRatingDialogComponent {
  @Input() visible = false;
  @Input() data!: { rating: number; postId: string };
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() afterRated = new EventEmitter<void>();

  options: AnimationOptions = {
    path: '/assets/animations/checkanimation.json',
  };

  isCreatingRate!: Signal<{
    status: 'idle' | 'loading' | 'finished';
    message?: string;
  }>;

  formGroup!: FormGroup;

  constructor(private postRatingServ: PostRatingsService) {
    this.isCreatingRate = this.postRatingServ.getIsFetchingPostLoader();
  }

  ngOnInit() {
    console.log('🚀 this.data al iniciar el ONINIT:', this.data);

    this.formGroup = new FormGroup({
      rating: new FormControl(this.data?.rating),
      postId: new FormControl(this.data?.postId),
    });
  }

  onDialogHide() {
    this.visibleChange.emit(false); // Asegura que el estado se resetee
  }

  onConfirmRate() {
    this.postRatingServ.createRatingPost(this.formGroup.value).subscribe({
      next: () => {
        console.log('ok');
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.formGroup?.get('rating')?.setValue(this.data.rating);
      this.formGroup?.get('postId')?.setValue(this.data.postId);
    }
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  updateRate() {
    this.afterRated.emit(); // Emite el evento al padre
  }
}
