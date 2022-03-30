import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleValueTaxComponent } from './single-value-tax.component';

describe('SingleValueTaxComponent', () => {
  let component: SingleValueTaxComponent;
  let fixture: ComponentFixture<SingleValueTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleValueTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleValueTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
