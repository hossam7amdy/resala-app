import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPayComponent } from './post-pay.component';

describe('PostPayComponent', () => {
  let component: PostPayComponent;
  let fixture: ComponentFixture<PostPayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostPayComponent],
    });
    fixture = TestBed.createComponent(PostPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
