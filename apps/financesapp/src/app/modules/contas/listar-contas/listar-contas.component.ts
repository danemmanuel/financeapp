import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'finances-app-listar-contas',
  templateUrl: './listar-contas.component.html',
  styleUrls: ['./listar-contas.component.scss'],
})
export class ListarContasComponent implements OnInit {
  @Input() contas;

  constructor() {}

  ngOnInit(): void {}
}
