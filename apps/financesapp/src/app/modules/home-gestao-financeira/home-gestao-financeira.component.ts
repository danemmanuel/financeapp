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
  selector: 'finances-app-home-gestao-financeira',
  templateUrl: './home-gestao-financeira.component.html',
  styleUrls: ['./home-gestao-financeira.component.scss'],
})
export class HomeGestaoFinanceiraComponent implements OnInit, OnDestroy {
  contas = [];
  despesas = [];
  receitas = [];
  mes;
  ano;
  a: Subscription;
  saldoContas: any;
  receitasEsteMes: any;
  despesasEsteMes: any;
  loading: boolean;
  despesasEmAberto: any;
  receitasEmAberto: any;
  despesasTotal = [];
  receitasTotal = [];
  graficoBanco: EChartsOption;

  constructor(
    private dialog: MatDialog,
    private _headerMesAnoService: HeaderMesAnoService,
    private _operacoesService: OperacoesService,
    private _contaService: ContasService,
    private router: Router
  ) {
    this.a = this._headerMesAnoService.getMesAno().subscribe(async (obj) => {
      if (!obj.mes) return;
      this.mes = obj.mes;
      this.ano = obj.ano;
      this.calcularOperacoes();
    });
    this._contaService.getConta().subscribe((conta) => {
      if (!conta) return;
      this.contas = conta;
      this.calcularSaldoContas();
    });
    this._operacoesService.getReceitas().subscribe((receitas) => {
      if (!receitas) return;
      this.receitasTotal = receitas;
      this.calcularOperacoes();
    });
    this._operacoesService.getDespesas().subscribe((despesas) => {
      if (!despesas) return;
      this.despesasTotal = despesas;
      this.calcularOperacoes();
    });
  }

  async ngOnInit() {
    this.loading = true;

    await this.calcularOperacoes();
    this.loading = false;
  }

  ngOnDestroy() {
    this.a.unsubscribe();
  }

  calcularOperacoes() {
    this.receitasEmAberto = this._operacoesService
      .calcularOperacoes(this.receitasTotal, this.mes, this.ano)
      .filter((operacao) => {
        return !operacao.efetivado;
      });

    this.despesasEmAberto = this._operacoesService
      .calcularOperacoes(this.despesasTotal, this.mes, this.ano)
      .filter((operacao) => {
        return !operacao.efetivado;
      });
    this.calcularReceitasEsteMes();
    this.calcularDespesasEsteMes();
  }

  async buscarDados() {
    this._operacoesService.consolidarCarteira()
    await this.calcularOperacoes();
  }

  redirecionar(rota) {
    this.router.navigate([`dashboard/${rota}`]);
  }

  calcularReceitasEsteMes() {
    this.receitasEsteMes = this.receitasEmAberto.reduce(
      (total, conta) => (total += conta.valor),
      0
    );
  }

  calcularDespesasEsteMes() {
    this.despesasEsteMes = this.despesasEmAberto.reduce(
      (total, conta) => (total += conta.valor),
      0
    );
  }

  calcularSaldoContas() {
    this.saldoContas = this.contas.reduce(
      (total, conta) => (total += conta.saldo),
      0
    );
  }
}
