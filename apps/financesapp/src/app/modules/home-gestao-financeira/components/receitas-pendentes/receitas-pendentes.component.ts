import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA = [
  { position: 1, name: 'Hydrogen', weight: 50.3 },
  { position: 2, name: 'Helium', weight: 43.3 },
  { position: 3, name: 'Lithium', weight: 6.9 },
  { position: 4, name: 'Beryllium', weight: 9.0 },
];
@Component({
  selector: 'finances-app-receitas-pendentes',
  templateUrl: './receitas-pendentes.component.html',
  styleUrls: ['./receitas-pendentes.component.scss']
})
export class ReceitasPendentesComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'weight'];
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
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
