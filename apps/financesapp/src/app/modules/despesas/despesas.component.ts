import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormularioOperacoesComponent } from '@finances-app-libs/operacoes-shared/src/lib/formulario-operacoes/formulario-operacoes.component';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';

@Component({
  selector: 'finances-app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.scss'],
})
export class DespesasComponent implements OnInit {
  operacoes = [];
  constructor(
    private dialog: MatDialog,
    private _operacoesService: OperacoesService
  ) {}

  ngOnInit(): void {
    this.buscarDespesas();
  }

  async buscarDespesas() {
    this.operacoes = await this._operacoesService.buscarDespesas().toPromise();
  }

  adicionarDespesa() {
    this.dialog.open(FormularioOperacoesComponent, {
      width: '450px',
      data: {
        tipoOperacao: 'Despesa',
      },
    });
  }
}
