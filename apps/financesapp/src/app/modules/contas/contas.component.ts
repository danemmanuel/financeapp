import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';
import { FormularioContaComponent } from '@finances-app-libs/conta-shared/src/lib/formulario-conta/formulario-conta.component';
import { HeaderMesAnoService } from '@finances-app-libs/header-mes/src/lib/header-mes/header-mes-ano.service';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';
import { Subscription } from 'rxjs';

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
  despesas: any;
  saldoPrevisto: any;
  receitas: any;

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
      this.buscarContas();
      this.calcularSaldoPrevisto();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.a.unsubscribe();
  }

  async buscarContas() {
    this.loading = true;
    this.contas = await this._contaService.buscarContas().toPromise();
    this.calcularSaldoAtual();
    this.loading = false;
  }

  calcularSaldoAtual() {
    this.saldoAtual = this.contas.reduce(
      (total, conta) => (total += conta.saldo),
      0
    );
  }

  async calcularSaldoPrevisto() {
    try {
      this.loading = true;
      await this.buscarDespesas();
      await this.buscarReceitas();

      const totalDespesas = this.despesas.reduce(
        (total, despesa) => (total += despesa.valor),
        0
      );
      const totalReceitas = this.receitas.reduce(
        (total, despesa) => (total += despesa.valor),
        0
      );
      this.saldoPrevisto = (totalReceitas - totalDespesas) + this.saldoAtual;
    } finally {
      this.loading = false;
    }
  }

  async buscarReceitas() {
    const filtros = {
      mes: this.mes,
      ano: this.ano,
    };
    this.receitas = await this._operacoesService
      .buscarReceitas(filtros)
      .toPromise();
  }

  async buscarDespesas() {
    const filtros = {
      mes: this.mes,
      ano: this.ano,
    };
    this.despesas = await this._operacoesService
      .buscarDespesas(filtros)
      .toPromise();
  }

  adicionarConta() {
    this.dialog
      .open(FormularioContaComponent, {
        width: '450px',
        data: {
          tipoOperacao: 'Despesa',
        },
      })
      .afterClosed()
      .subscribe((r) => {
        if (r) {
          this.buscarContas();
        }
      });
  }
}
