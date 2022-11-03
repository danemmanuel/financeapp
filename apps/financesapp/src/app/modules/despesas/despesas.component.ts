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

  configurarGraficoPorBanco(operacoes) {
    this.graficoBanco = this._operacoesService.configurarGraficoPorBanco(operacoes);
  }

  configurarGraficoPorCategoria(operacoes) {
    let dataGrafico = operacoes?.map((operacao) => {
      return {
        name: operacao.categoria.descricao,
        value: operacoes
          .filter(
            (operacaoF) =>
              operacao.categoria.descricao === operacaoF.categoria.descricao
          )
          .reduce((total, operacaoV) => (total += operacaoV.valor), 0),
      };
    });

    this.graficoCategoria = {
      backgroundColor: '#191919',
      legend: {
        top: 60,
        data: this.removeDuplicado(dataGrafico)?.map((r) => {
          return r.name;
        }),
      },
      title: {
        name: 'Teste',
        show: true,
        left: 'center',
        top: 0,
        text: 'Distribuição por Categoria',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : R${c} <b>({d}%)</b>',
      },
      dataZoom: [
        {
          type: 'inside',
        },
      ],
      series: [
        {
          name: 'area',
          type: 'pie',
          top: 90,
          data: this.removeDuplicado(dataGrafico),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }

  removeDuplicado(array) {
    return array?.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.name === value.name)
    );
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
    this.operacoes = this._operacoesService.calcularOperacoes(
      this.todasOperacoes,
      this.mes,
      this.ano
    );
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
