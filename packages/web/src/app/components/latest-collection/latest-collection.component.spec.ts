import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestCollectionComponent } from './latest-collection.component';

describe('LatestCollectionComponent', () => {
  let component: LatestCollectionComponent;
  let fixture: ComponentFixture<LatestCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LatestCollectionComponent]
    });
    fixture = TestBed.createComponent(LatestCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
