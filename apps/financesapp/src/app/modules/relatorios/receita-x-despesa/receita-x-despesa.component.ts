import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';
import { HeaderMesAnoService } from '@finances-app-libs/header-mes/src/lib/header-mes/header-mes-ano.service';
import { FormularioOperacoesComponent } from '@finances-app-libs/operacoes-shared/src/lib/formulario-operacoes/formulario-operacoes.component';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';
import { Subscription } from 'rxjs';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'finances-app-receita-x-despesa',
  templateUrl: './receita-x-despesa.component.html',
  styleUrls: ['./receita-x-despesa.component.scss'],
})
export class ReceitaXDespesaComponent implements OnInit, OnDestroy {
  @Input() despesasTotal = [];
  @Input() receitasTotal = [];
  @Output() despesasXMeses = new EventEmitter(null);
  @Output() receitasXMeses = new EventEmitter(null);
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
  graficoBanco: EChartsOption;
  saldoPrevisto: any;

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

    this.configurarGrafico();
  }

  configurarGrafico(xMeses = 7) {
    const dataAtual = new Date();
    let dadosReceitas = [];
    let dadosDespesas = [];
    let meses = [];

    for (let i = 1; i < xMeses; i++) {
      let mes;
      switch (dataAtual.getMonth() + 1) {
        case 1:
          mes = 'Janeiro';
          break;
        case 2:
          mes = 'Fevereiro';
          break;
        case 3:
          mes = 'Março';
          break;
        case 4:
          mes = 'Abril';
          break;
        case 5:
          mes = 'Maio';
          break;
        case 6:
          mes = 'Junho';
          break;
        case 7:
          mes = 'Julho';
          break;
        case 8:
          mes = 'Agosto';
          break;
        case 9:
          mes = 'Setembro';
          break;
        case 10:
          mes = 'Outubro';
          break;
        case 11:
          mes = 'Novembro';
          break;
        case 12:
          mes = 'Dezembro';
          break;
      }
      const receitas = this._operacoesService.calcularOperacoes(
        this.receitasTotal,
        dataAtual.getMonth() + 1,
        dataAtual.getFullYear()
      );

      const despesas = this._operacoesService.calcularOperacoes(
        this.despesasTotal,
        dataAtual.getMonth() + 1,
        dataAtual.getFullYear()
      );

      if (receitas.length && despesas.length) {
        dadosReceitas.push(
          receitas.reduce((total, conta) => (total += conta.valor), 0)
        );
        dadosDespesas.push(
          despesas.reduce((total, conta) => (total += conta.valor), 0)
        );
        meses.push(mes);
      }

      dataAtual.setMonth(dataAtual.getMonth() - 1);
    }

    this.despesasXMeses.emit(dadosDespesas);
    this.receitasXMeses.emit(dadosReceitas);
    this.graficoBanco = this._operacoesService.configurarGraficoHome(
      meses.reverse(),
      dadosDespesas.reverse(),
      dadosReceitas.reverse()
    );
  }
}
