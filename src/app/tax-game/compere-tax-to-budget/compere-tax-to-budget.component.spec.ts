import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompereTaxToBudgetComponent } from './compere-tax-to-budget.component';

describe('CompereTaxToBudgetComponent', () => {
  let component: CompereTaxToBudgetComponent;
  let fixture: ComponentFixture<CompereTaxToBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompereTaxToBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompereTaxToBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
