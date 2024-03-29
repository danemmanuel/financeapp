import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeaderMesAnoService } from '@finances-app-libs/header-mes/src/lib/header-mes/header-mes-ano.service';
import { FormularioOperacoesComponent } from '@finances-app-libs/operacoes-shared/src/lib/formulario-operacoes/formulario-operacoes.component';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';
import { Subscription } from 'rxjs';
import { EChartsOption } from 'echarts';

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
  graficoCategoria: EChartsOption;
  graficoBanco: EChartsOption;
  operacoesFiltradas: any[];

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

    this._operacoesService.getDespesas().subscribe((despesas) => {
      if (!despesas) return;
      this.todasOperacoes = despesas;
      this.buscarDespesas();
    });
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.a.unsubscribe();
  }

  configurarGraficoPorBanco(operacoes) {
    this.graficoBanco = this._operacoesService.configurarGraficoPorBanco(
      operacoes,
      'despesa'
    );
  }

  configurarGraficoPorCategoria(operacoes) {
    this.graficoCategoria = this._operacoesService.configurarGraficoPorCategoria(
      operacoes,
      'despesa'
    );
  }

  removeDuplicado(array) {
    return array?.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.name === value.name)
    );
  }

  limparFiltro() {
    this.operacoesFiltradas = this.operacoes;
  }

  filtrarPorBanco(e) {
    this.operacoesFiltradas = this.operacoes.filter((operacao) => {
      return operacao.conta.instituicao === e.data.name;
    });
  }

  async buscarDespesas(refazerGet?) {
    this.loading = true;
    if (refazerGet) {
      this._operacoesService.consolidarCarteira();
    }
    this.operacoes = this.todasOperacoes;
    this.calcularOperacoes();
    this.calcularTotalPendente();
    this.calcularTotalPago();
    this.loading = false;
  }

  calcularOperacoes() {
    this.operacoes = this._operacoesService.calcularOperacoes(
      this.todasOperacoes,
      this.mes,
      this.ano
    );
    this.operacoesFiltradas = this.operacoes;
    this.configurarGraficoPorCategoria(this.operacoes);
    this.configurarGraficoPorBanco(this.operacoes);
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
        maxWidth: '90%',
        autoFocus: true,
        data: {
          tipoOperacao: 'Despesa',
          operacoes: this.todasOperacoes,
        },
      })
      .afterClosed()
      .subscribe(async (r) => {
        if (r) {
          this.buscarDespesas(true);
        }
      });
  }
}
