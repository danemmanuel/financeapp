import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';
import { HeaderMesAnoService } from '@finances-app-libs/header-mes/src/lib/header-mes/header-mes-ano.service';
import { FormularioOperacoesComponent } from '@finances-app-libs/operacoes-shared/src/lib/formulario-operacoes/formulario-operacoes.component';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';
import { Subscription } from 'rxjs';

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
      this.buscarDados();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.a.unsubscribe();
  }

  async buscarDados() {
    try {
      this.loading = true;
      await this.buscarDespesas();
      await this.buscarReceitas();
      await this.buscarContas();
    } finally {
      this.loading = false;
    }
  }
  async buscarContas() {
    this.contas = await this._contaService.buscarContas().toPromise();
    this.calcularSaldoContas();
  }

  async buscarDespesas() {
    const filtros = {
      mes: this.mes,
      ano: this.ano,
    };
    const despesas = await this._operacoesService
      .buscarDespesas(filtros)
      .toPromise();
    this.despesasEmAberto = despesas.filter((despesa) => !despesa.efetivado);
    this.despesas = despesas;
    this.calcularDespesasEsteMes();
  }

  async buscarReceitas() {
    const filtros = {
      mes: this.mes,
      ano: this.ano,
    };
    const receitas = await this._operacoesService
      .buscarReceitas(filtros)
      .toPromise();
    this.receitasEmAberto = receitas.filter((despesa) => !despesa.efetivado);
    this.receitas = receitas;
    this.calcularReceitasEsteMes();
  }

  redirecionar(rota) {
    this.router.navigate([`dashboard/${rota}`]);
  }

  calcularReceitasEsteMes() {
    this.receitasEsteMes = this.receitas.reduce(
      (total, conta) => (total += conta.valor),
      0
    );
  }

  calcularDespesasEsteMes() {
    this.despesasEsteMes = this.despesas.reduce(
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
        data: {
          tipoOperacao: 'Receita',
        },
      })
      .afterClosed()
      .subscribe((r) => {
        if (r) {
          this.buscarDados();
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
      .subscribe((r) => {
        if (r) {
          this.buscarDados();
        }
      });
  }
}
