import { Component, OnInit } from '@angular/core';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';

@Component({
  selector: 'finances-app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss'],
})
export class RelatoriosComponent implements OnInit {
  despesasTotal = [];
  receitasTotal = [];
  contas = [];

  constructor(
    private _operacoesService: OperacoesService,
    private _contaService: ContasService
  ) {}

  async ngOnInit() {
    this.buscarContas();
    this.buscarDespesas();
    this.buscarReceitas();
  }

  async buscarContas() {
    this.contas = await this._contaService.buscarContas().toPromise();
  }

  async buscarDespesas() {
    this.despesasTotal = await this._operacoesService
      .buscarDespesas({})
      .toPromise();
  }

  async buscarReceitas() {
    this.receitasTotal = await this._operacoesService
      .buscarReceitas({})
      .toPromise();
  }
}
