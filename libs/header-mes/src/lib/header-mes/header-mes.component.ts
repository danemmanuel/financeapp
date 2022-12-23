import { Component, OnInit } from '@angular/core';
import { HeaderMesAnoService } from '@finances-app-libs/header-mes/src/lib/header-mes/header-mes-ano.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {NgIf} from "@angular/common";
import {MatTooltipModule} from "@angular/material/tooltip";
@Component({
  selector: 'finances-app-header-mes',
  templateUrl: './header-mes.component.html',
  styleUrls: ['./header-mes.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule, NgIf, MatTooltipModule],
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
    this.data.setDate(1);
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

  checkMes(): boolean {
    const mesAtual = new Date().getMonth();
    if (this.meses[mesAtual] !== this.mesAtual) {
      return true;
    }
  }

  setMesAtual() {
    const dataAtual = new Date();
    this.data = dataAtual;
    this.data.setMonth(dataAtual.getMonth());
    this.mesAtual = this.meses[dataAtual.getMonth()];
    this.anoAtual = dataAtual.getFullYear();
    this.atualizarMesAno();
  }
}
