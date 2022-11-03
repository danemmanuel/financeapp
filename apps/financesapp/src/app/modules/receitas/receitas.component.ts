import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeaderMesAnoService } from '@finances-app-libs/header-mes/src/lib/header-mes/header-mes-ano.service';
import { FormularioOperacoesComponent } from '@finances-app-libs/operacoes-shared/src/lib/formulario-operacoes/formulario-operacoes.component';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';
import { Subscription } from 'rxjs';
import { EChartsOption } from 'echarts';
import { CoolTheme } from '@finances-app/src/app/modules/receitas/theme';

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
  coolTheme = CoolTheme;
  updateOptions: any;
  graficoBanco: EChartsOption;
  graficoCategoria: EChartsOption;

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
  }

  ngOnInit(): void {
    this.buscarReceitas();
  }

  ngOnDestroy() {
    this.a.unsubscribe();
  }

  configurarGraficoPorBanco(operacoes) {
    let dataGrafico = operacoes?.map((operacao) => {
      return {
        name: operacao.conta.instituicao,
        value: operacoes
          .filter(
            (operacaoF) =>
              operacao.conta.instituicao === operacaoF.conta.instituicao
          )
          .reduce((total, operacaoV) => (total += operacaoV.valor), 0),
      };
    });

    this.graficoBanco = {
      backgroundColor: '#191919',
      legend: {
        top: 60,
        data: this.removeDuplicado(dataGrafico)?.map((r) => {
          return r.name;
        }),
      },
      title: {
        name: 'Teste 2',
        show: true,
        left: 'center',
        top: 0,
        text: 'Distribuição por Banco',
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
        },
      ],
    };
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
        text: 'Distribuição de Receitas',
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

  async buscarReceitas() {
    this.loading = true;

    this.todasOperacoes = await this._operacoesService
      .buscarReceitas({})
      .toPromise();
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
        data: {
          tipoOperacao: 'Receita',
        },
      })
      .afterClosed()
      .subscribe((r) => {
        if (r) {
          this.buscarReceitas();
        }
      });
  }
}
