import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AuthService } from '@finances-app/src/app/core/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'finances-app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss'],
})
export class ContaComponent implements OnInit {
  formConta: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.authService.getDadosUsuario().subscribe((dadosUsuario) => {
      console.log(dadosUsuario);
      if (!dadosUsuario) return;
      this.montarFormUsuario(dadosUsuario);
    });
  }

  async ngOnInit() {}

  atualizarDados() {

  }
  montarFormUsuario(dadosConta) {
    this.formConta = this.fb.group({
      nome: this.fb.control(dadosConta.name),
      usuario: this.fb.control(dadosConta.email),
      nascimento: this.fb.control(null),
      cel: this.fb.control(null),
    });
    this.formConta.get('usuario').disable();
  }
}
