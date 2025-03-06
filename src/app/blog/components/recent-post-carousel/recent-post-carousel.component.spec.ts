import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPostCarouselComponent } from './recent-post-carousel.component';

describe('RecentPostCarouselComponent', () => {
  let component: RecentPostCarouselComponent;
  let fixture: ComponentFixture<RecentPostCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentPostCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentPostCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
