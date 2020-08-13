import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioOperacoesComponent } from './formulario-operacoes.component';

describe('FormularioOperacoesComponent', () => {
  let component: FormularioOperacoesComponent;
  let fixture: ComponentFixture<FormularioOperacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioOperacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioOperacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
