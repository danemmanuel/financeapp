import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../../core/auth/auth.service';

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
    private fb: FormBuilder
  ) {
    this.router.events
      .pipe(
        filter(
          (e) =>
            e instanceof ActivationEnd &&
            Object.keys(e.snapshot.params).length > 0
        ),
        map((e) => (e instanceof ActivationEnd ? e.snapshot.params : {}))
      )
      .subscribe((params) => {
        if (!params.jwt) {
          return;
        }

        localStorage.setItem('token', JSON.stringify(params.jwt));
        this.router.navigate(['dashboard/home']);
      });
  }

  ngOnInit(): void {
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
    try {
      let login;
      if (this.isCadastro) {
        login = await this._authService
          .cadastro({
            email: this.formLogin.get(`email`)?.value,
            password: this.formLogin.get('senha')?.value,
            name: this.formLogin.get(`nome`)?.value,
          })
          .toPromise();
      } else {
        login = await this._authService
          .login({
            email: this.formLogin.get(`email`)?.value,
            password: this.formLogin.get(`senha`)?.value,
          })
          .toPromise();
      }

      localStorage.setItem('token', JSON.stringify(login.access_token));
      this.router.navigate(['dashboard/home']);
    } catch (err) {}
  }
}
