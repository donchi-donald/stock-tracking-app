import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSentimentComponent } from './single-sentiment.component';

describe('SingleSentimentComponent', () => {
  let component: SingleSentimentComponent;
  let fixture: ComponentFixture<SingleSentimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSentimentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleSentimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
