import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsDisplayComponent } from './posts-display.component';

describe('PostsDisplayComponent', () => {
  let component: PostsDisplayComponent;
  let fixture: ComponentFixture<PostsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
