import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../../core/auth/auth.service';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';
import { OperacoesService } from '@finances-app-libs/operacoes-shared/src/lib/operacoes.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'finances-app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  formLogin: FormGroup;
  isCadastro = false;
  private contas: any;
  private despesas: any;
  private receitas: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService,
    private fb: FormBuilder,
    private _contaService: ContasService,
    private _operacoesService: OperacoesService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (!params.jwt) {
        return;
      }
      localStorage.setItem('token', JSON.stringify(params.jwt));
      this._authService.setDadosUsuario(jwt_decode(localStorage?.getItem('token')))
      this._operacoesService.consolidarCarteira();
      this.router.navigate(['dashboard/home']);
    });
    if (this._authService.isAuthenticated()) {
      this._operacoesService.consolidarCarteira();

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

    this.formLogin.get('email').valueChanges.subscribe((r) => {
      this.formLogin
        .get('email')
        .setValue(r.toLowerCase(), { emitEvent: false });
    });
  }

  loginGoogle() {
    window.open(`https://financess-back.herokuapp.com/auth`, '_self');
  }

  loginFacebook() {
    window.open(`https://financess-back.herokuapp.com/auth/facebook`, '_self');
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
        .subscribe(
          (r) => {
            localStorage.setItem('token', JSON.stringify(r.access_token));
            this._authService.setDadosUsuario(jwt_decode(localStorage?.getItem('token')))
            this.router.navigate(['dashboard/home']);
            window.location.reload();
          },
          (error) => {
            this._snackBar.open('Usuário já utilizado, tente outro', '', {
              duration: 5000,
            });
          }
        );
    } else {
      this._authService
        .login({
          email: this.formLogin.get(`email`)?.value,
          password: this.formLogin.get(`senha`)?.value,
        })
        .subscribe(
          (r) => {
            localStorage.setItem('token', JSON.stringify(r.access_token));
            this._authService.setDadosUsuario(jwt_decode(localStorage?.getItem('token')))
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
