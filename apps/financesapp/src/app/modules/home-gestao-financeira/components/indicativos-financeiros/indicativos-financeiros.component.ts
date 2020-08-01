import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
const ELEMENT_DATA = [
  { indicativo: 'Salário Mínimo', valor: 'R$ 1.045,00' },
  { indicativo: 'CDI', valor: '+2,15%' },
  { indicativo: 'SELIC', valor: '+2,25%' },
];

@Component({
  selector: 'finances-app-indicativos-financeiros',
  templateUrl: './indicativos-financeiros.component.html',
  styleUrls: ['./indicativos-financeiros.component.scss']
})
export class IndicativosFinanceirosComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['indicativo', 'valor'];

  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = ELEMENT_DATA;
  }

}
