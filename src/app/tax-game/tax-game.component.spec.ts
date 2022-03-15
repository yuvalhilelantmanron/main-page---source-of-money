import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxGameComponent } from './tax-game.component';

describe('TaxGameComponent', () => {
  let component: TaxGameComponent;
  let fixture: ComponentFixture<TaxGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
