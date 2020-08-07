import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

const ELEMENT_DATA = [
  { name: 'Hydrogen', data: '13/08/2020', weight: 50.3, icone: 'check_circle' },
  { name: 'Helium', data: '13/08/2020', weight: 43.3, icone: 'check_circle' },
  { name: 'Lithium', data: '13/08/2020', weight: 6.9, icone: 'push_pin' },
  { name: 'Beryllium', data: '13/08/2020', weight: 9.0, icone: 'push_pin' },
];

@Component({
  selector: 'finances-app-listar-receitas',
  templateUrl: './listar-receitas.component.html',
  styleUrls: ['./listar-receitas.component.scss'],
})
export class ListarReceitasComponent implements OnInit {
  displayedColumns: string[] = ['name', 'data', 'weight', 'icone'];
  selection = new SelectionModel<any>(true, []);
  dataSource = new MatTableDataSource();

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = ELEMENT_DATA;
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
