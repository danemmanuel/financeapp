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

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  async ngOnInit() {
    this.buscarDados();
  }

  async buscarDados() {
    const token = jwt_decode(localStorage?.getItem('token'));
    const dadosConta = await this.authService
      .buscarConta(token['sub'])
      .toPromise();
    this.montarFormUsuario(dadosConta._doc);
  }

  montarFormUsuario(dadosConta) {
    this.formConta = this.fb.group({
      nome: this.fb.control(dadosConta.name),
      usuario: this.fb.control(dadosConta.email),
    });
    this.formConta.get('usuario').disable();
  }
}
