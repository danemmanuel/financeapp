import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMesComponent } from './header-mes.component';

describe('HeaderMesComponent', () => {
  let component: HeaderMesComponent;
  let fixture: ComponentFixture<HeaderMesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
