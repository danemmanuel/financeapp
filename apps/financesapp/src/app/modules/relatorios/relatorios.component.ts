import { Component, OnInit } from '@angular/core';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';

@Component({
  selector: 'finances-app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss'],
})
export class RelatoriosComponent implements OnInit {
  despesasTotal = [];
  receitasTotal = [];
  contas = [];
  private arrayDespesas = [];
  private arrayReceitas = [];
  mediaDespesa: number;
  mediaReceita: number;
  mediaSobra: number;
  porcentagemGasto: any;

  constructor(
    private _operacoesService: OperacoesService,
    private _contaService: ContasService
  ) {
    this._contaService.getConta().subscribe((conta) => {
      if (!conta) return;
      this.contas = conta;
    });
    this._operacoesService.getReceitas().subscribe((receitas) => {
      if (!receitas) return;
      this.receitasTotal = receitas;
    });
    this._operacoesService.getDespesas().subscribe((despesas) => {
      if (!despesas) return;
      this.despesasTotal = despesas;
    });
  }

  async ngOnInit() {}

  calcularPorcentagem() {
    this.porcentagemGasto = (100 * this.mediaDespesa) / this.mediaReceita;
    this.porcentagemGasto = this.porcentagemGasto.toFixed(2);
  }

  atribuirDadosDespesas(dadosDespesas) {
    this.arrayDespesas = dadosDespesas.filter((despesa) => despesa);
    this.calcularMedias();
  }

  atribuirDadosReceitas(dadosReceitas) {
    this.arrayReceitas = dadosReceitas.filter((despesa) => despesa);
    this.calcularMedias();
  }

  calcularMedias() {
    this.mediaDespesa =
      this.arrayDespesas.reduce((a, b) => a + b, 0) / this.arrayDespesas.length;

    this.mediaReceita =
      this.arrayReceitas.reduce((a, b) => a + b, 0) / this.arrayReceitas.length;

    this.mediaSobra = this.mediaReceita - this.mediaDespesa;

    this.calcularPorcentagem();
  }
}
