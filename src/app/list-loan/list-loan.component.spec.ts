import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLoanComponent } from './list-loan.component';

describe('ListLoanComponent', () => {
  let component: ListLoanComponent;
  let fixture: ComponentFixture<ListLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListLoanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
