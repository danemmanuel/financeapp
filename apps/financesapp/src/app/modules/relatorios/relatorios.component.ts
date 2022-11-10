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

  constructor(
    private _operacoesService: OperacoesService,
    private _contaService: ContasService
  ) {}

  async ngOnInit() {
    this.buscarContas();
    this.buscarDespesas();
    this.buscarReceitas();
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
    console.log(this.arrayDespesas);
    this.mediaDespesa =
      this.arrayDespesas.reduce((a, b) => a + b, 0) / this.arrayDespesas.length;

    this.mediaReceita =
      this.arrayReceitas.reduce((a, b) => a + b, 0) / this.arrayReceitas.length;

    this.mediaSobra = this.mediaReceita - this.mediaDespesa;
  }

  async buscarContas() {
    this.contas = await this._contaService.buscarContas().toPromise();
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
}
