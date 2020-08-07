import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'finances-app-fit-card',
  templateUrl: './fit-card.component.html',
  styleUrls: ['./fit-card.component.scss'],
})
export class FitCardComponent implements OnInit {
  @Input() titulo;
  @Input() cor;
  @Input() icone;
  @Input() valor;
  @Input() tooltip;
  @Input() mostrarBtn;
  @Output() btnClicado = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  btnClick() {
    this.btnClicado.emit(true);
  }
}
