import { Component, OnInit } from '@angular/core';
import { HeaderMesAnoService } from '@finances-app-libs/header-mes/src/lib/header-mes/header-mes-ano.service';
@Component({
  selector: 'finances-app-header-mes',
  templateUrl: './header-mes.component.html',
  styleUrls: ['./header-mes.component.scss'],
})
export class HeaderMesComponent implements OnInit {
  data = new Date();
  meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
    'Janeiro',
  ];
  mesAtual = '';
  anoAtual = 0;

  constructor(private _headerMesAnoService: HeaderMesAnoService) {}

  ngOnInit(): void {
    console.log(this.data.getMonth());

    this.mesAtual = this.meses[this.data.getMonth()];
    this.anoAtual = this.data.getFullYear();
    this.atualizarMesAno();
  }

  avancarMes() {
    this.data.setMonth(this.data.getMonth() + 1);
    this.mesAtual = this.meses[this.data.getMonth()];
    this.anoAtual = this.data.getFullYear();
    this.atualizarMesAno();
  }

  recuarMes() {
    this.data.setMonth(this.data.getMonth() - 1);
    this.mesAtual = this.meses[this.data.getMonth()];
    this.anoAtual = this.data.getFullYear();
    this.atualizarMesAno();
  }

  atualizarMesAno() {
    this._headerMesAnoService.setMesAno({
      mes: this.data.getMonth() + 1,
      ano: this.data.getFullYear(),
    });
  }
}
