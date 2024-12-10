import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPriceComponent } from './loan-price.component';

describe('LoanPriceComponent', () => {
  let component: LoanPriceComponent;
  let fixture: ComponentFixture<LoanPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanPriceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
