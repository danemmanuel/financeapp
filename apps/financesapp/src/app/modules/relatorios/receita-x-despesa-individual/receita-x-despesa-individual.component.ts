import { Component, OnInit } from '@angular/core';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';
import { HeaderMesAnoService } from '@finances-app-libs/header-mes/src/lib/header-mes/header-mes-ano.service';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';
import { Subscription } from 'rxjs';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'finances-app-receita-x-despesa-individual',
  templateUrl: './receita-x-despesa-individual.component.html',
  styleUrls: ['./receita-x-despesa-individual.component.scss'],
})
export class ReceitaXDespesaIndividualComponent implements OnInit {
  private despesasTotal: any;
  private receitasTotal: any;
  private receitasEmAberto: any;
  private despesasEmAberto: any;
  a: Subscription;
  private mes: any;
  private ano: any;
  dadosGrafico: EChartsOption;
  private saldoPrevisto: any;
  private saldoAtual: any;
  private contas: any;
  private receitas: any;
  private despesas: any;

  constructor(
    private _operacoesService: OperacoesService,
    private _headerMesAnoService: HeaderMesAnoService,
    private _contaService: ContasService
  ) {
    this.a = this._headerMesAnoService.getMesAno().subscribe(async (obj) => {
      if (!obj.mes) return;
      this.mes = obj.mes;
      this.ano = obj.ano;

      this.calcularOperacoes();
    });
  }

  async ngOnInit() {
    await this.buscarContas();
    this.calcularSaldoAtual();
    await this.buscarDespesas();
    await this.buscarReceitas();
    this.calcularOperacoes();
  }

  async buscarContas() {
    this.contas = await this._contaService.buscarContas().toPromise();
  }

  calcularOperacoes() {
    this.receitasEmAberto = this._operacoesService.calcularOperacoes(
      this.receitasTotal,
      this.mes,
      this.ano
    );

    this.despesasEmAberto = this._operacoesService.calcularOperacoes(
      this.despesasTotal,
      this.mes,
      this.ano
    );
    this.configurarRelatorio();
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

  calcularSaldoAtual() {
    this.saldoAtual = this.contas.reduce(
      (total, conta) => (total += conta.saldo),
      0
    );
  }

  configurarRelatorio() {
    this.receitas = this._operacoesService.calcularOperacoes(
      this.receitasTotal,
      this.mes,
      this.ano
    );
    this.despesas = this._operacoesService.calcularOperacoes(
      this.despesasTotal,
      this.mes,
      this.ano
    );

    const receitasEmAberto = this.receitas
      ?.filter((despesa) => !despesa.efetivado)
      .reduce((total, despesa) => (total += despesa.valor), 0);

    const totalDespesas = this.despesas
      ?.filter((despesa) => !despesa.efetivado)
      .reduce((total, despesa) => (total += despesa.valor), 0);
    this.saldoPrevisto = this.saldoAtual - totalDespesas + receitasEmAberto;
    console.log(this.saldoAtual, totalDespesas, receitasEmAberto)
    const dadosReceita = {
      value: this.receitasEmAberto?.reduce(
        (total, conta) => (total += conta.valor),
        0
      ),
      name: 'Receita',
      itemStyle: {
        color: '#35AE96',
      },
    };

    const dadosDespesa = {
      value: this.despesasEmAberto?.reduce(
        (total, conta) => (total += conta.valor),
        0
      ),
      name: 'Despesa',
      itemStyle: {
        color: '#FF604F',
      },
    };

    this.dadosGrafico = this._operacoesService.configurarGraficoReceitaXDespesa(
      dadosReceita,
      dadosDespesa,
      this.saldoPrevisto,
      this.mes,
      this.ano
    );
  }
}
