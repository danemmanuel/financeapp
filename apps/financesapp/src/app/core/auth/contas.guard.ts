import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormularioContaComponent } from '@finances-app-libs/conta-shared/src/lib/formulario-conta/formulario-conta.component';
@Injectable()
export class ContasGuard implements CanActivate {
  private contas: any;

  constructor(
    public auth: AuthService,
    public router: Router,
    private _contaService: ContasService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this._contaService.getConta().subscribe((conta) => {
      if (!conta) return;
      this.contas = conta;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!this.contas?.length) {
        const contas = await this._contaService.buscarContas().toPromise();
        this._contaService.setConta(contas);
        if (contas.length) {
          resolve(true);
        } else {
          this.router.navigate(['dashboard/contas']);
          this._snackBar.open('Cadastre uma conta para continuar', 'Fechar', {
            duration: 5000,
          });
          this.adicionarConta(route);
          reject();
        }
      }
      resolve(true);
    });
  }

  adicionarConta(route) {
    this.dialog
      .open(FormularioContaComponent, {
        width: '450px',
        autoFocus: true,
        data: {
          tipoOperacao: 'Despesa',
        },
      })
      .afterClosed()
      .subscribe(async (r) => {
        if (r) {
          const contas = await this._contaService.buscarContas().toPromise();
          this._contaService.setConta(contas);
          this.router.navigate([`dashboard/${route.routeConfig.path}`]);
        }
      });
  }
}
