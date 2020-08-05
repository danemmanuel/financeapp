import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitCardComponent } from './fit-card.component';

describe('FitCardComponent', () => {
  let component: FitCardComponent;
  let fixture: ComponentFixture<FitCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
