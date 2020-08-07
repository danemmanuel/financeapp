import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'finances-app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss']
})
export class ReceitasComponent implements OnInit {
  receitas = [
    { name: 'Hydrogen', data: '13/08/2020', weight: 50.3, icone: 'check_circle' },
    { name: 'Helium', data: '13/08/2020', weight: 43.3, icone: 'check_circle' },
    { name: 'Lithium', data: '13/08/2020', weight: 6.9, icone: 'push_pin' },
    { name: 'Beryllium', data: '13/08/2020', weight: 9.0, icone: 'push_pin' },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
