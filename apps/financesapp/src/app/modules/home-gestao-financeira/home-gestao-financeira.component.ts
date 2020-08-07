import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'finances-app-home-gestao-financeira',
  templateUrl: './home-gestao-financeira.component.html',
  styleUrls: ['./home-gestao-financeira.component.scss'],
})
export class HomeGestaoFinanceiraComponent implements OnInit {
  receitasPendentes = [
    { name: 'Lithium', data: '13/08/2020', weight: 6.9, icone: 'push_pin' },
    { name: 'Beryllium', data: '13/08/2020', weight: 9.0, icone: 'push_pin' },
  ];

  constructor() {}

  ngOnInit(): void {}

  cadastrarReceita() {
    console.log('cadastrar receita');
  }

  cadastrarDespesa() {
    console.log('cadastrar despesa');
  }
}
