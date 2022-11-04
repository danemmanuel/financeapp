import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';
import { FormularioContaComponent } from '@finances-app-libs/conta-shared/src/lib/formulario-conta/formulario-conta.component';
import { HeaderMesAnoService } from '@finances-app-libs/header-mes/src/lib/header-mes/header-mes-ano.service';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';
import { Subscription } from 'rxjs';
import { FormularioTransferenciaContaComponent } from '@finances-app-libs/conta-shared/src/lib/formulario-transferencia-conta/formulario-transferencia-conta.component';

@Component({
  selector: 'finances-app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.scss'],
})
export class ContasComponent implements OnInit, OnDestroy {
  contas: any = [];
  saldoAtual: any;
  loading: boolean;
  a: Subscription;
  mes;
  ano;
  saldoPrevisto: any;
  despesas = [];
  receitas = [];
  receitasTotal = [];
  despesasTotal = [];

  constructor(
    private dialog: MatDialog,
    private _contaService: ContasService,
    private _headerMesAnoService: HeaderMesAnoService,
    private _operacoesService: OperacoesService
  ) {
    this.a = this._headerMesAnoService.getMesAno().subscribe((obj) => {
      if (!obj.mes) return;
      this.mes = obj.mes;
      this.ano = obj.ano;
      this.calcularSaldoPrevisto();
    });
  }

  async ngOnInit() {
    this.loading = true;
    await this.buscarContas();
    await this.buscarReceitas();
    await this.buscarDespesas();
    await this.calcularSaldoPrevisto();
    this.loading = false;
  }

  ngOnDestroy() {
    this.a.unsubscribe();
  }

  async buscarContas() {
    this.contas = await this._contaService.buscarContas().toPromise();
    this.calcularSaldoAtual();
    await this.calcularSaldoPrevisto();
    return this.contas;
  }

  calcularSaldoAtual() {
    this.saldoAtual = this.contas.reduce(
      (total, conta) => (total += conta.saldo),
      0
    );
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

  async calcularSaldoPrevisto() {
    try {
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
        .filter((despesa) => !despesa.efetivado)
        .reduce((total, despesa) => (total += despesa.valor), 0);

      const totalDespesas = this.despesas
        .filter((despesa) => !despesa.efetivado)
        .reduce((total, despesa) => (total += despesa.valor), 0);
      this.saldoPrevisto = this.saldoAtual - totalDespesas + receitasEmAberto;
    } finally {
    }
  }

  transferenciaContas() {
    this.dialog
      .open(FormularioTransferenciaContaComponent, {
        width: '450px',
        autoFocus: true,
        data: {},
      })
      .afterClosed()
      .subscribe(async (r) => {
        if (r) {
          this.buscarContas();
          this.loading = false;
        }
      });
  }

  adicionarConta() {
    this.dialog
      .open(FormularioContaComponent, {
        width: '450px',
        autoFocus: true,
        data: {
          tipoOperacao: 'Despesa',
        },
      })
      .afterClosed()
      .subscribe(async (r) => {
        if (r) {
          this.buscarContas();
          this.loading = false;
        }
      });
  }
}
