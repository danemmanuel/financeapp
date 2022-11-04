import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';
import { HeaderMesAnoService } from '@finances-app-libs/header-mes/src/lib/header-mes/header-mes-ano.service';
import { FormularioOperacoesComponent } from '@finances-app-libs/operacoes-shared/src/lib/formulario-operacoes/formulario-operacoes.component';
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

  constructor(
    private _operacoesService: OperacoesService,
    private _headerMesAnoService: HeaderMesAnoService
  ) {
    this.a = this._headerMesAnoService.getMesAno().subscribe(async (obj) => {
      if (!obj.mes) return;
      this.mes = obj.mes;
      this.ano = obj.ano;

      this.calcularOperacoes();
    });
  }

  async ngOnInit() {
    await this.buscarDespesas();
    await this.buscarReceitas();
    this.calcularOperacoes();
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
    console.log(this.receitasEmAberto, this.despesasEmAberto);
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

  configurarRelatorio() {
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
      dadosDespesa
    );
  }
}
