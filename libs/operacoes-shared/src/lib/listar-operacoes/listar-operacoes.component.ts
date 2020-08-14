import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormularioOperacoesComponent } from '@finances-app/operacoes-shared';

@Component({
  selector: 'finances-app-listar-operacoes',
  templateUrl: './listar-operacoes.component.html',
  styleUrls: ['./listar-operacoes.component.scss'],
})
export class ListarOperacoesComponent implements OnInit {
  @Input() titulo;
  @Input() receitas;
  displayedColumns: string[] = ['name', 'data', 'weight', 'icone'];
  dataSource = new MatTableDataSource();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.data = this.receitas;
  }

  receitaSelecionada(receita) {
    this.dialog.open(FormularioOperacoesComponent, {
      width: '450px',
      data: {
        tipoOperacao: 'Receita',
        operacao: {
          valor: 1000,
        },
      },
    });
  }
}
