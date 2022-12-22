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
  isMobile: boolean;
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
    this._contaService.getConta().subscribe(async (contas) => {
      if (!contas) return;
      this.contas = contas;
      this.buscarContas();

    });
    this._operacoesService.getReceitas().subscribe(async (receitas) => {
      if (!receitas) return;
      this.receitasTotal = receitas;
      this.buscarContas();
    });
    this._operacoesService.getDespesas().subscribe(async (despesas) => {
      if (!despesas) return;
      this.despesasTotal = despesas;
      this.buscarContas();
    });
  }

  async ngOnInit() {
    this.isMobile = window.innerWidth < 768;
    this.loading = true;

    await this.calcularSaldoPrevisto();
    this.loading = false;
  }

  ngOnDestroy() {
    this.a.unsubscribe();
  }

  async buscarContas(refazerGet?) {
    if (refazerGet) {
      this.contas = await this._contaService.buscarContas().toPromise();
      this._contaService.setConta(this.contas);
    }
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
          this.buscarContas(true);
          this.loading = false;
        }
      });
  }

  adicionarConta() {
    this.dialog
      .open(FormularioContaComponent, {
        maxWidth: '400px',
        autoFocus: true,
        data: {
          tipoOperacao: 'Despesa',
        },
      })
      .afterClosed()
      .subscribe(async (r) => {
        if (r) {
          this.buscarContas(true);
          this.loading = false;
        }
      });
  }
}
