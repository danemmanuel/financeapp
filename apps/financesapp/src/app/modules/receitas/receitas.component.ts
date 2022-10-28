import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeaderMesAnoService } from '@finances-app-libs/header-mes/src/lib/header-mes/header-mes-ano.service';
import { FormularioOperacoesComponent } from '@finances-app-libs/operacoes-shared/src/lib/formulario-operacoes/formulario-operacoes.component';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';
import { Subscription } from 'rxjs';

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
      this.calcularTotalRecebido();
    });
  }

  ngOnInit(): void {
    this.buscarReceitas();
  }
  ngOnDestroy() {
    this.a.unsubscribe();
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
