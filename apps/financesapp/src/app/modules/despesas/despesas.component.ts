import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormularioOperacoesComponent } from '@finances-app-libs/operacoes-shared/src/lib/formulario-operacoes/formulario-operacoes.component';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';
import { HeaderMesAnoService } from '@finances-app-libs/header-mes/src/lib/header-mes/header-mes-ano.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'finances-app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.scss'],
})
export class DespesasComponent implements OnInit, OnDestroy {
  operacoes = [];
  mes;
  ano;
  a: Subscription;
  loading: boolean;
  totalPendente: any;
  totalPago: any;
  constructor(
    private dialog: MatDialog,
    private _operacoesService: OperacoesService,
    private _headerMesAnoService: HeaderMesAnoService
  ) {
    this.a = this._headerMesAnoService.getMesAno().subscribe((obj) => {
      if (!obj.mes) return;
      this.mes = obj.mes;
      this.ano = obj.ano;
      this.buscarDespesas();
    });
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.a.unsubscribe();
  }

  async buscarDespesas() {
    this.loading = true;
    const filtros = {
      mes: this.mes,
      ano: this.ano,
    };
    this.operacoes = await this._operacoesService
      .buscarDespesas(filtros)
      .toPromise();
    this.calcularTotalPendente();
    this.calcularTotalPago();
    this.loading = false;
  }

  calcularTotalPendente() {
    this.totalPendente = this.operacoes
      .filter((operacao) => !operacao.efetivado)
      .reduce((total, operacao) => (total += operacao.valor), 0);
  }

  calcularTotalPago() {
    this.totalPago = this.operacoes
      .filter((operacao) => operacao.efetivado)
      .reduce((total, operacao) => (total += operacao.valor), 0);
  }

  adicionarDespesa() {
    this.dialog
      .open(FormularioOperacoesComponent, {
        width: '450px',
        data: {
          tipoOperacao: 'Despesa',
        },
      })
      .afterClosed()
      .subscribe((r) => {
        if (r) {
          this.buscarDespesas();
        }
      });
  }
}
