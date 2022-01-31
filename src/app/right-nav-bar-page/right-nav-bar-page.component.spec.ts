import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightNavBarPageComponent } from './right-nav-bar-page.component';

describe('RightNavBarPageComponent', () => {
  let component: RightNavBarPageComponent;
  let fixture: ComponentFixture<RightNavBarPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightNavBarPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightNavBarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
