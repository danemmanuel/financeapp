import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormularioContaComponent } from './formulario-conta.component';

describe('FormularioContaComponent', () => {
  let component: FormularioContaComponent;
  let fixture: ComponentFixture<FormularioContaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioContaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
