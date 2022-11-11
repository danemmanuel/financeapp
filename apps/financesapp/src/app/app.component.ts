import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';
import {OperacoesService} from "@finances-app-libs/operacoes-shared/src/lib/operacoes.service";

@Component({
  selector: 'finances-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'financesapp';
  autenticado: boolean;
  token = ``;
  private contas: any;
  private despesas: any;
  constructor(
    private router: Router,
    private _authService: AuthService,
    private _contaService: ContasService,
    private _operacoesService: OperacoesService
  ) {}
  async ngOnInit() {
    this.token = localStorage?.getItem('token');
    this.buscarContas();
    this.buscarDespesas();
  }

  async buscarContas() {
    this.contas = await this._contaService.buscarContas().toPromise();
    this._contaService.setConta(this.contas);
  }

  async buscarDespesas() {
    this.despesas = await this._contaService.buscarContas().toPromise();
    this._operacoesService.setDespesa(this.despesas);
  }
}
