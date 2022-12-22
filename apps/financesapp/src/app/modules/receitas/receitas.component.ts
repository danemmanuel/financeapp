import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeaderMesAnoService } from '@finances-app-libs/header-mes/src/lib/header-mes/header-mes-ano.service';
import { FormularioOperacoesComponent } from '@finances-app-libs/operacoes-shared/src/lib/formulario-operacoes/formulario-operacoes.component';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';
import { Subscription } from 'rxjs';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'finances-app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss'],
})
export class ReceitasComponent implements OnInit, OnDestroy {
  operacoes = [];
  mes;
  ano;
  a: Subscription;
  loading: boolean;
  totalPendente: any;
  totalRecebido: any;
  todasOperacoes: any;
  updateOptions: any;
  graficoBanco: EChartsOption;
  graficoCategoria: EChartsOption;
  operacoesFiltradas: any[];

  constructor(
    private dialog: MatDialog,
    private _operacoesService: OperacoesService,
    private _headerMesAnoService: HeaderMesAnoService
  ) {
    this.a = this._headerMesAnoService.getMesAno().subscribe(async (obj) => {
      if (!obj.mes) return;
      this.mes = obj.mes;
      this.ano = obj.ano;
      this.calcularOperacoes();
      this.calcularTotalPendente();
      this.calcularTotalRecebido();
    });

    this._operacoesService.getReceitas().subscribe((receitas) => {
      if (!receitas) return;
      this.todasOperacoes = receitas;
      this.buscarReceitas();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.a.unsubscribe();
  }

  configurarGraficoPorBanco(operacoes) {
    this.graficoBanco = this._operacoesService.configurarGraficoPorBanco(
      operacoes,
      'receita'
    );
  }

  configurarGraficoPorCategoria(operacoes) {
    this.graficoCategoria = this._operacoesService.configurarGraficoPorCategoria(
      operacoes,
      'receita'
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

  async buscarReceitas(refazerGet?) {
    this.loading = true;
    if (refazerGet) {
      this._operacoesService.consolidarCarteira();
    }
    this.operacoes = this.todasOperacoes;
    this.calcularOperacoes();
    this.calcularTotalPendente();
    this.calcularTotalRecebido();
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

  calcularTotalRecebido() {
    if (!this.operacoes) return;
    this.totalRecebido = this.operacoes
      .filter((operacao) => operacao.efetivado)
      .reduce((total, operacao) => (total += operacao.valor), 0);
  }

  adicionarReceita() {
    this.dialog
      .open(FormularioOperacoesComponent, {
        width: '450px',
        maxWidth: '90%',
        autoFocus: true,
        data: {
          tipoOperacao: 'Receita',
          operacoes: this.todasOperacoes
        },
      })
      .afterClosed()
      .subscribe((r) => {
        if (r) {
          this.buscarReceitas(true);
        }
      });
  }
}
