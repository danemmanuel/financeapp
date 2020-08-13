import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { FormularioOperacoesComponent } from '@finances-app/operacoes-shared';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'finances-app-listar-receitas',
  templateUrl: './listar-receitas.component.html',
  styleUrls: ['./listar-receitas.component.scss'],
})
export class ListarReceitasComponent implements OnInit {
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
        }
      },
    });
  }
}
