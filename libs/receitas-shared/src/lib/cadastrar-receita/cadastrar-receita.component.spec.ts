import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarReceitaComponent } from './cadastrar-receita.component';

describe('CadastrarReceitaComponent', () => {
  let component: CadastrarReceitaComponent;
  let fixture: ComponentFixture<CadastrarReceitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarReceitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
