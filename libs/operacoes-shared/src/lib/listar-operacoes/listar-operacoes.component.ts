import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormularioOperacoesComponent } from '@finances-app-libs/operacoes-shared/src/lib/formulario-operacoes/formulario-operacoes.component';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';

@Component({
  selector: 'finances-app-listar-operacoes',
  templateUrl: './listar-operacoes.component.html',
  styleUrls: ['./listar-operacoes.component.scss'],
})
export class ListarOperacoesComponent implements OnInit, OnChanges {
  @Output() buscarOperacoes = new EventEmitter();
  @Output() limparFiltro = new EventEmitter();
  @Input() titulo;
  @Input() operacoes;
  @Input() tipoOperacao;
  @Input() mes;
  @Input() ano;
  @Input() shakeFiltro;
  filtro: boolean;
  operacoesFiltradas: any;
  categorias = [];
  categoriaSelecionada: any;

  constructor(
    private dialog: MatDialog,
    private operacoesService: OperacoesService
  ) {}

  ngOnInit(): void {
    this.preencherOperacoes();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.operacoes) {
      this.preencherOperacoes();
      if (this.filtro) {
        this.operacoesFiltradas = this.operacoes.filter((operacao) => {
          return operacao.efetivado === this.filtro;
        });
      }
    }
  }

  preencherOperacoes() {
    this.operacoes = this.operacoes.map((operacao) => {
      return { ...operacao, efetivado: !!operacao.efetivado };
    });

    this.operacoesFiltradas = this.operacoes.sort(
      (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
    );

    this.categorias = this.operacoesFiltradas.map((op) => {
      return op.categoria;
    });
    this.categorias = this.operacoesService.removeDuplicado(
      this.categorias,
      'descricao'
    );
  }

  selecionarCategoria(categoria) {
    this.filtro = false;
    this.categoriaSelecionada = categoria;
    if (!categoria) {
      this.operacoesFiltradas = this.operacoes;
      return;
    }
    this.operacoesFiltradas = this.operacoes.filter((operacao) => {
      return operacao.categoria.descricao === categoria.descricao;
    });
    if (this.filtro) {
      this.operacoesFiltradas = this.operacoes.filter((operacao) => {
        return (
          operacao.efetivado === !this.filtro &&
          operacao.categoria?.descricao === this.categoriaSelecionada?.descricao
        );
      });
    }
  }

  filtroChange() {
    this.operacoesFiltradas = this.operacoes.filter((operacao) => {
      return operacao.efetivado === !this.filtro;
    });
    if (this.categoriaSelecionada) {
      this.operacoesFiltradas = this.operacoes.filter((operacao) => {
        return (
          operacao.efetivado === !this.filtro &&
          operacao.categoria?.descricao === this.categoriaSelecionada?.descricao
        );
      });
    }
  }

  reset() {
    this.filtro = null;
    this.operacoesFiltradas = this.operacoes;
    this.limparFiltro.emit(true);
    this.categoriaSelecionada = null;
  }

  receitaSelecionada(receita) {
    if (receita.fixa) {
      const novaData = `${this.ano}-${this.mes}-${receita.data.split('-')[2]}`;
      receita.data = novaData;
    }
    this.dialog
      .open(FormularioOperacoesComponent, {
        width: '450px',
        maxWidth: '90%',
        autoFocus: false,
        data: {
          tipoOperacao: this.tipoOperacao,
          operacao: {
            receita,
          },
        },
      })
      .afterClosed()
      .subscribe((r) => {
        if (r) {
          this.buscarOperacoes.emit(true);
          this.reset();
        }
      });
  }
}
