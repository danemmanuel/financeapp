import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormularioContaComponent } from '@finances-app-libs/conta-shared/src/lib/formulario-conta/formulario-conta.component';

@Component({
  selector: 'finances-app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.scss']
})
export class ContasComponent implements OnInit {
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

  adicionarConta() {
    this.dialog.open(FormularioContaComponent, {
      width: '450px',
      data: {
        tipoOperacao: 'Despesa',
      },
    });
  }
}
