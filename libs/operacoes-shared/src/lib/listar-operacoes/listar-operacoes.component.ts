import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormularioOperacoesComponent } from '@finances-app-libs/operacoes-shared/src/lib/formulario-operacoes/formulario-operacoes.component';

@Component({
  selector: 'finances-app-listar-operacoes',
  templateUrl: './listar-operacoes.component.html',
  styleUrls: ['./listar-operacoes.component.scss'],
})
export class ListarOperacoesComponent implements OnInit {
  @Input() titulo;
  @Input() set operacoes(operacoes) {
    this.atualizarOperacoes(operacoes);
  }
  @Input() tipoOperacao;
  displayedColumns: string[] = ['descricao', 'data', 'valor', 'icone'];
  dataSource = new MatTableDataSource();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  atualizarOperacoes(operacoes) {
    this.dataSource = new MatTableDataSource(operacoes);
  }

  receitaSelecionada(receita) {
    this.dialog.open(FormularioOperacoesComponent, {
      width: '450px',
      data: {
        tipoOperacao: this.tipoOperacao,
        operacao: {
          valor: 1000,
        },
      },
    });
  }
}
