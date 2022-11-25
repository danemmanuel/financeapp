import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';

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
  private receitas: any;
  constructor(
    private router: Router,
    private _authService: AuthService,
    private _contaService: ContasService,
    private _operacoesService: OperacoesService,
    private route: ActivatedRoute,

  ) {
    this.route.params.subscribe((params) => {
      if (!params.jwt) {
        return;
      }
      console.log(params);
      localStorage.setItem('token', JSON.stringify(params.jwt));
      this.router.navigate(['dashboard/home']);
    });

    this._contaService.getConta().subscribe((conta) => {
      if (!conta) return;
      this.contas = conta;
    });
    this._operacoesService.getReceitas().subscribe((receitas) => {
      if (!receitas) return;
      this.receitas = receitas;
    });
    this._operacoesService.getDespesas().subscribe((despesas) => {
      if (!despesas) return;
      this.despesas = despesas;
    });
  }
  async ngOnInit() {
    this.token = localStorage?.getItem('token');
    setTimeout(()=>{
      this.buscarContas();
      this.buscarReceitas();
      this.buscarDespesas();
    }, 1000)

  }

  async buscarContas() {
    if (this.contas) return;
    this.contas = await this._contaService.buscarContas().toPromise();
    this._contaService.setConta(this.contas);
  }

  async buscarDespesas() {
    if (this.despesas) return;
    this.despesas = await this._operacoesService.buscarDespesas({}).toPromise();
    this._operacoesService.setDespesa(this.despesas);
  }

  async buscarReceitas() {
    if (this.receitas) return;
    this.receitas = await this._operacoesService.buscarReceitas({}).toPromise();
    this._operacoesService.setReceita(this.receitas);
  }
}
