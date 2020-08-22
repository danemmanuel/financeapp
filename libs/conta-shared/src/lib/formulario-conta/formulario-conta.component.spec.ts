import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioContaComponent } from './formulario-conta.component';

describe('FormularioContaComponent', () => {
  let component: FormularioContaComponent;
  let fixture: ComponentFixture<FormularioContaComponent>;

  beforeEach(async(() => {
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
