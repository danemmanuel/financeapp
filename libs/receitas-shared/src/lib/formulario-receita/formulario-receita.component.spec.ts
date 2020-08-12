import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioReceitaComponent } from './formulario-receita.component';

describe('FormularioReceitaComponent', () => {
  let component: FormularioReceitaComponent;
  let fixture: ComponentFixture<FormularioReceitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioReceitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
