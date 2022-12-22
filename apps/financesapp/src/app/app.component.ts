import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';
import jwt_decode from 'jwt-decode';

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
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      if (!params.jwt) {
        return;
      }
      localStorage.setItem('token', JSON.stringify(params.jwt));
      this._operacoesService.consolidarCarteira();

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
    if (!localStorage?.getItem('token')) return;
    const token = jwt_decode(localStorage?.getItem('token'));
    this._authService.setDadosUsuario(token);
  }
  async ngOnInit() {
    this.token = localStorage?.getItem('token');
    if (!this.token) {
      this.router.navigate(['dashboard/home']);
      return;
    }
    this._authService.setDadosUsuario(
      jwt_decode(localStorage?.getItem('token'))
    );
    this._operacoesService.consolidarCarteira();
  }
}
