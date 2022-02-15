import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'finances-app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params.jwt);
      if (!params.jwt) {
        return;
      }
      localStorage.setItem('token', JSON.stringify(params.jwt));
      this.router.navigate(['dashboard/home']);
    });
    if (localStorage?.getItem('token')) {
      this.router.navigate(['dashboard/home']);
    }
    this.montarFormulario();
  }

  montarFormulario() {
    this.formLogin = this.fb.group({
      email: this.fb.control(null, [Validators.required]),
      senha: this.fb.control(null, [Validators.required]),
    });
  }

  loginGoogle() {
    window.open(`https://api.minhasfinancas.digital/auth`, '_self');
  }

  async login() {
    try {
      const login = await this._authService
        .login({
          email: this.formLogin.get(`email`)?.value,
          password: this.formLogin.get(`senha`)?.value,
        })
        .toPromise();
      localStorage.setItem('token', JSON.stringify(login.access_token));
      this.router.navigate(['dashboard/home']);
      location.reload();
    } catch (err) {}
  }
}
