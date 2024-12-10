import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanService } from './loan-service.component';

describe('LoanServiceComponent', () => {
  let component: LoanService;
  let fixture: ComponentFixture<LoanService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
