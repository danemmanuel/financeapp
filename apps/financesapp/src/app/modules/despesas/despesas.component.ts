import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormularioOperacoesComponent } from '@finances-app-libs/operacoes-shared/src/lib/formulario-operacoes/formulario-operacoes.component';

@Component({
  selector: 'finances-app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.scss'],
})
export class DespesasComponent implements OnInit {
  receitas = [
    {
      name: 'Hydrogen',
      data: '13/08/2020',
      weight: 50.13,
      icone: 'check_circle',
    },
    { name: 'Helium', data: '13/08/2020', weight: 43.3, icone: 'check_circle' },
    { name: 'Lithium', data: '13/08/2020', weight: 6.9, icone: 'push_pin' },
    { name: 'Beryllium', data: '13/08/2020', weight: 9.0, icone: 'push_pin' },
  ];
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  adicionarDespesa() {
    this.dialog.open(FormularioOperacoesComponent, {
      width: '450px',
      data: {
        tipoOperacao: 'Despesa',
      },
    });
  }
}
