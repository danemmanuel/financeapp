import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeaderMesAnoService } from '@finances-app-libs/header-mes/src/lib/header-mes/header-mes-ano.service';
import { FormularioOperacoesComponent } from '@finances-app-libs/operacoes-shared/src/lib/formulario-operacoes/formulario-operacoes.component';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'finances-app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.scss'],
})
export class ReceitasComponent implements OnInit, OnDestroy {
  operacoes = [];
  mes;
  ano;
  a: Subscription;

  constructor(
    private dialog: MatDialog,
    private _operacoesService: OperacoesService,
    private _headerMesAnoService: HeaderMesAnoService
  ) {
    this.a = this._headerMesAnoService.getMesAno().subscribe((obj) => {
      if (!obj.mes) return;
      this.mes = obj.mes;
      this.ano = obj.ano;
      this.buscarReceitas();
    });
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.a.unsubscribe();
  }

  async buscarReceitas() {
    const filtros = {
      mes: this.mes,
      ano: this.ano,
    };
    this.operacoes = await this._operacoesService
      .buscarReceitas(filtros)
      .toPromise();
  }

  adicionarReceita() {
    this.dialog
      .open(FormularioOperacoesComponent, {
        width: '450px',
        data: {
          tipoOperacao: 'Receita',
        },
      })
      .afterClosed()
      .subscribe((r) => {
        if (r) {
          this.buscarReceitas();
        }
      });
  }
}
