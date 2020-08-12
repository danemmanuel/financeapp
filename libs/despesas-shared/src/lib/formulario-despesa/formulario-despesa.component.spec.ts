import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioDespesaComponent } from './formulario-despesa.component';

describe('FormularioDespesaComponent', () => {
  let component: FormularioDespesaComponent;
  let fixture: ComponentFixture<FormularioDespesaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioDespesaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioDespesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
