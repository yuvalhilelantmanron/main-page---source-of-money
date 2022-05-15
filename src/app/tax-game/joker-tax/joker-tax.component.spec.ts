import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JokerTaxComponent } from './joker-tax.component';

describe('JokerTaxComponent', () => {
  let component: JokerTaxComponent;
  let fixture: ComponentFixture<JokerTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JokerTaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JokerTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
