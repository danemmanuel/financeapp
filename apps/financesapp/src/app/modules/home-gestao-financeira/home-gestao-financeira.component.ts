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
  }

  async ngOnInit() {
    this.loading = true;
    await this.buscarContas();
    await this.buscarDespesas();
    await this.buscarReceitas();
    await this.calcularOperacoes();
    this.loading = false;
  }

  ngOnDestroy() {
    this.a.unsubscribe();
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
    this.calcularReceitasEsteMes();
    this.calcularDespesasEsteMes();
  }

  async buscarDados() {
    try {
      await this.buscarContas();
      await this.buscarDespesas();
      await this.buscarReceitas();
      await this.calcularOperacoes();
    } finally {
    }
  }
  async buscarContas() {
    this.contas = await this._contaService.buscarContas().toPromise();
    this.calcularSaldoContas();
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

  cadastrarReceita() {
    this.dialog
      .open(FormularioOperacoesComponent, {
        width: '450px',
        maxWidth: '100vw',
        height: '100vh',
        data: {
          tipoOperacao: 'Receita',
        },
      })
      .afterClosed()
      .subscribe(async (r) => {
        if (r) {
          await this.buscarDespesas();
          await this.buscarReceitas();
          this.calcularOperacoes();
        }
      });
  }

  cadastrarDespesa() {
    this.dialog
      .open(FormularioOperacoesComponent, {
        width: '450px',
        data: {
          tipoOperacao: 'Despesa',
        },
      })
      .afterClosed()
      .subscribe(async (r) => {
        if (r) {
          await this.buscarDespesas();
          await this.buscarReceitas();
          this.calcularOperacoes();
        }
      });
  }
}
