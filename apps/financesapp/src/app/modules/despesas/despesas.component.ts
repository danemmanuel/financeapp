import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeaderMesAnoService } from '@finances-app-libs/header-mes/src/lib/header-mes/header-mes-ano.service';
import { FormularioOperacoesComponent } from '@finances-app-libs/operacoes-shared/src/lib/formulario-operacoes/formulario-operacoes.component';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';
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
  todasOperacoes: any;

  constructor(
    private dialog: MatDialog,
    private _operacoesService: OperacoesService,
    private _headerMesAnoService: HeaderMesAnoService
  ) {
    this.a = this._headerMesAnoService.getMesAno().subscribe((obj) => {
      if (!obj.mes) return;
      this.mes = obj.mes;
      this.ano = obj.ano;
      this.calcularOperacoes();
      this.calcularTotalPendente();
      this.calcularTotalPago();
    });
  }

  ngOnInit(): void {
    this.buscarDespesas();
  }
  ngOnDestroy() {
    this.a.unsubscribe();
  }

  async buscarDespesas() {
    this.loading = true;

    this.todasOperacoes = await this._operacoesService
      .buscarDespesas({})
      .toPromise();
    this.operacoes = this.todasOperacoes;
    this.calcularOperacoes();
    this.calcularTotalPendente();
    this.calcularTotalPago();
    this.loading = false;
  }

  calcularOperacoes() {
    this.operacoes = this.todasOperacoes?.filter((operacao) => {
      return (
        (operacao.fixa &&
          !operacao.excluirData.find((data) => {
            return (
              +data.toString().split('-')[1] === this.mes &&
              +data.toString().split('-')[0] === this.ano
            );
          })) ||
        (!operacao.fixa &&
          +operacao.data.split('-')[1] === this.mes &&
          +operacao.data.split('-')[0] === this.ano)
      );
    });
  }

  calcularTotalPendente() {
    if (!this.operacoes) return;
    this.totalPendente = this.operacoes
      .filter((operacao) => !operacao.efetivado)
      .reduce((total, operacao) => (total += operacao.valor), 0);
  }

  calcularTotalPago() {
    if (!this.operacoes) return;
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
