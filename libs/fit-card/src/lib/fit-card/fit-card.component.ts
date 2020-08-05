import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'finances-app-fit-card',
  templateUrl: './fit-card.component.html',
  styleUrls: ['./fit-card.component.scss']
})
export class FitCardComponent implements OnInit {
  @Input() titulo;
  @Input() cor;
  @Input() icone;
  @Input() valor;

  constructor() { }

  ngOnInit(): void {
  }

}
