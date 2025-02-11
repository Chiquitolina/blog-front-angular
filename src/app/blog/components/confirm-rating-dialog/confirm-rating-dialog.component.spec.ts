import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRatingDialogComponent } from './confirm-rating-dialog.component';

describe('ConfirmRatingDialogComponent', () => {
  let component: ConfirmRatingDialogComponent;
  let fixture: ComponentFixture<ConfirmRatingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmRatingDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmRatingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
