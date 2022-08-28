import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListarOperacoesComponent } from './listar-operacoes.component';

describe('ListarOperacoesComponent', () => {
  let component: ListarOperacoesComponent;
  let fixture: ComponentFixture<ListarOperacoesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [ListarOperacoesComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarOperacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
