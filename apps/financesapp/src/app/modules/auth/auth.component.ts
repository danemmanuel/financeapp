import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../../core/auth/auth.service';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'finances-app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  formLogin: FormGroup;
  isCadastro = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService,
    private fb: FormBuilder,
    private _contaService: ContasService,
    private _operacoesService: OperacoesService,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    console.log(this.router);
    console.log(this.route)
    this.route.params.subscribe((params) => {
      if (!params.jwt) {
        return;
      }
      console.log(params);
      localStorage.setItem('token', JSON.stringify(params.jwt));
      this.router.navigate(['dashboard/home']);
    });
    if (this._authService.isAuthenticated()) {
      this.router.navigate(['dashboard/home']);
    }
    this.montarFormulario();
  }

  montarFormulario() {
    this.formLogin = this.fb.group({
      email: this.fb.control(null, [Validators.required]),
      senha: this.fb.control(null, [Validators.required]),
      nome: this.fb.control(null, []),
    });
  }

  loginGoogle() {
    window.open(`https://api.minhasfinancas.digital/auth`, '_self');
  }

  async login() {
    if (this.formLogin.invalid) return;

    if (this.isCadastro) {
      this._authService
        .cadastro({
          email: this.formLogin.get(`email`)?.value,
          password: this.formLogin.get('senha')?.value,
          name: this.formLogin.get(`nome`)?.value,
        })
        .subscribe((r) => {
          localStorage.setItem('token', JSON.stringify(r.access_token));
          this.router.navigate(['dashboard/home']);
          window.location.reload();
        });
    } else {
      this._authService
        .login({
          email: this.formLogin.get(`email`)?.value,
          password: this.formLogin.get(`senha`)?.value,
        })
        .subscribe(
          (r) => {
            localStorage.setItem('token', JSON.stringify(r.access_token));
            this.router.navigate(['dashboard/home']);
            window.location.reload();
          },
          (error) => {
            this._snackBar.open('Usuário ou senha incorretos', '', {
              duration: 5000,
            });
          }
        );
    }
  }
}
