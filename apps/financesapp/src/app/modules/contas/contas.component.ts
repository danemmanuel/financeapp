import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';
import { FormularioContaComponent } from '@finances-app-libs/conta-shared/src/lib/formulario-conta/formulario-conta.component';

@Component({
  selector: 'finances-app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.scss'],
})
export class ContasComponent implements OnInit {
  contas: any = [];

  constructor(
    private dialog: MatDialog,
    private _contaService: ContasService
  ) {}

  ngOnInit(): void {
    this.buscarContas();
  }

  async buscarContas() {
    this.contas = await this._contaService.buscarContas().toPromise()
  }

  adicionarConta() {
    this.dialog.open(FormularioContaComponent, {
      width: '450px',
      data: {
        tipoOperacao: 'Despesa',
      },
    });
  }
}
