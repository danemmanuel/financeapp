import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormularioContaComponent } from '@finances-app-libs/conta-shared/src/lib/formulario-conta/formulario-conta.component';

@Component({
  selector: 'finances-app-listar-contas',
  templateUrl: './listar-contas.component.html',
  styleUrls: ['./listar-contas.component.scss'],
})
export class ListarContasComponent implements OnInit {
  @Input() contas;
  @Output() buscarContas = new EventEmitter();
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  editarConta(conta) {
    this.dialog
      .open(FormularioContaComponent, { data: { conta } })
      .afterClosed()
      .subscribe((r) => {
        if (r) {
          this.buscarContas.emit(true);
        }
      });
  }
}
