import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormularioOperacoesComponent } from '@finances-app-libs/operacoes-shared/src/lib/formulario-operacoes/formulario-operacoes.component';
import { HeaderMesAnoService } from '@finances-app-libs/header-mes/src/lib/header-mes/header-mes-ano.service';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'finances-app-home-gestao-financeira',
  templateUrl: './home-gestao-financeira.component.html',
  styleUrls: ['./home-gestao-financeira.component.scss'],
})
export class HomeGestaoFinanceiraComponent implements OnInit, OnDestroy {
  despesas = [];
  receitas = [];
  mes;
  ano;
  a: Subscription;

  constructor(
    private dialog: MatDialog,
    private _headerMesAnoService: HeaderMesAnoService,
    private _operacoesService: OperacoesService
  ) {
    this.a = this._headerMesAnoService.getMesAno().subscribe((obj) => {
      if (!obj.mes) return;
      this.mes = obj.mes;
      this.ano = obj.ano;
      this.buscarDespesas();
      this.buscarReceitas();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.a.unsubscribe();
  }

  async buscarDespesas() {
    const filtros = {
      mes: this.mes,
      ano: this.ano,
    };
    this.despesas = await this._operacoesService
      .buscarDespesas(filtros)
      .toPromise();
  }

  async buscarReceitas() {
    const filtros = {
      mes: this.mes,
      ano: this.ano,
    };
    this.receitas = await this._operacoesService
      .buscarReceitas(filtros)
      .toPromise();
  }

  cadastrarReceita() {
    this.dialog.open(FormularioOperacoesComponent, {
      width: '450px',
      data: {
        tipoOperacao: 'Receita',
      },
    });
  }

  cadastrarDespesa() {
    this.dialog.open(FormularioOperacoesComponent, {
      width: '450px',
      data: {
        tipoOperacao: 'Despesa',
      },
    });
  }
}
