import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'finances-app-listar-receitas',
  templateUrl: './listar-receitas.component.html',
  styleUrls: ['./listar-receitas.component.scss'],
})
export class ListarReceitasComponent implements OnInit {
  @Input() titulo;
  @Input() receitas;
  displayedColumns: string[] = ['name', 'data', 'weight', 'icone'];
  selection = new SelectionModel<any>(true, []);
  dataSource = new MatTableDataSource();

  constructor() {}

  ngOnInit(): void {
    console.log(this.titulo);
    this.dataSource.data = this.receitas;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}
