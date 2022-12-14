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
  @Input() origin;
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

  monthDiff(dateFrom, dateTo) {
    return (
      dateTo.getMonth() -
      dateFrom.getMonth() +
      12 * (dateTo.getFullYear() - dateFrom.getFullYear())
    );
  }

  preencherOperacoes() {
    const dataTo = new Date(`${this.mes}-01-${this.ano}`);

    this.operacoes = this.operacoes.map((operacao) => {
      const dateFrom = new Date(
        `${operacao.data.split('-')[1]}-01-${operacao.data.split('-')[0]}`
      );
      console.log(dateFrom);
      return {
        ...operacao,
        efetivado: !!operacao.efetivado,
        dif: this.monthDiff(dateFrom, dataTo) + 1,
      };
    });
    console.log(this.operacoes);

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
    if (!this.filtro) {
      this.operacoesFiltradas = this.operacoes.filter((operacao) => {
        return operacao.efetivado === false;
      });

      if (this.categoriaSelecionada) {
        this.operacoesFiltradas = this.operacoesFiltradas.filter((operacao) => {
          return (
            operacao.categoria?.descricao ===
            this.categoriaSelecionada?.descricao
          );
        });
      }
    } else {
      this.operacoesFiltradas = this.operacoes;
      if (this.categoriaSelecionada) {
        this.operacoesFiltradas = this.operacoesFiltradas.filter((operacao) => {
          return (
            operacao.categoria?.descricao ===
            this.categoriaSelecionada?.descricao
          );
        });
        return;
      }

      this.operacoesFiltradas = this.operacoes;
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

  adicionarReceita() {
    this.dialog
      .open(FormularioOperacoesComponent, {
        width: '450px',
        maxWidth: '90%',
        autoFocus: true,
        data: {
          tipoOperacao: 'Receita',
        },
      })
      .afterClosed()
      .subscribe((r) => {
        if (r) {
          this.operacoesService.consolidarCarteira();
        }
      });
  }

  adicionarDespesa() {
    this.dialog
      .open(FormularioOperacoesComponent, {
        width: '450px',
        maxWidth: '90%',
        autoFocus: true,
        data: {
          tipoOperacao: 'Despesa',
        },
      })
      .afterClosed()
      .subscribe(async (r) => {
        if (r) {
          this.operacoesService.consolidarCarteira();
        }
      });
  }
}
