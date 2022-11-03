import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CurrencyMaskConfig } from 'ngx-currency';
import { Observable } from 'rxjs';
import { COMMA } from '@angular/cdk/keycodes';
import { ContasService } from '../contas.service';

@Component({
  selector: 'finances-app-formulario-conta',
  templateUrl: './formulario-transferencia-conta.component.html',
  styleUrls: ['./formulario-transferencia-conta.component.scss'],
})
export class FormularioTransferenciaContaComponent implements OnInit {
  formConta: FormGroup;
  tipoOperacao;
  allInstituicoes: string[] = [
    'Nubank',
    'Neon',
    'Bradesco',
    'C6',
    'Inter',
    'Itau',
    'BTG',
    'Unicred',
  ];
  filteredInstituicoes: Observable<string[]>;
  instituicaoFinanceira: string[] = [];
  selectable = true;
  removable = true;
  currencyOption: CurrencyMaskConfig = {
    allowNegative: false,
    allowZero: false,
    nullable: false,
    suffix: '',
    max: 99999999,
    min: 0,
    precision: 2,
    align: 'left',
    thousands: '.',
    decimal: ',',
    prefix: 'R$',
  };
  tiposConta = [
    {
      id: 1,
      descricao: 'Conta Corrente',
    },
    {
      id: 2,
      descricao: 'Investimentos',
    },
    {
      id: 3,
      descricao: 'Dinheiro',
    },
    {
      id: 4,
      descricao: 'Outros',
    },
  ];
  separatorKeysCodes: number[] = [COMMA];
  @ViewChild('instituicaoInput') instituicaoInput: ElementRef<HTMLInputElement>;
  usAmount = 0;
  isMobile: boolean;
  loading: boolean;
  contas = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<FormularioTransferenciaContaComponent>,
    private fb: FormBuilder,
    private _contaService: ContasService
  ) {}

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 768;
    this.montarFormulario();
    this.tipoOperacao = this.data.tipoOperacao;
    this.buscarContas();
  }

  async buscarContas() {
    this.loading = true;
    this.contas = await this._contaService.buscarContas().toPromise();
    this.loading = false;
  }

  byId(item1, item2) {
    return item1._id === item2._id;
  }

  updateUSAmount(event) {
    this.usAmount = event.target.value;
  }

  preencherFormulario() {
    this.formConta.reset(this.data.conta);
  }

  by(item1, item2) {
    return item1 === item2;
  }

  montarFormulario() {
    this.formConta = this.fb.group({
      saldo: this.fb.control(null, [Validators.required]),
      contaOrigem: this.fb.control(null, [Validators.required]),
      contaDestino: this.fb.control(null, [Validators.required]),
    });
  }

  async enviarFormulario() {
    if (this.formConta.invalid) return;

    let formValue = this.formConta.value;
    console.log(formValue);

    let objSalvarContaOrigem = {
      _id: formValue.contaOrigem._id,
      saldo: formValue.contaOrigem.saldo - +this.formConta.get('saldo').value,
      instituicao: formValue.contaOrigem.instituicao,
      tipoConta: formValue.contaOrigem.tipoConta,
    };
    let objSalvarContaDestino = {
      _id: formValue.contaDestino._id,
      saldo: formValue.contaDestino.saldo + +this.formConta.get('saldo').value,
      instituicao: formValue.contaDestino.instituicao,
      tipoConta: formValue.contaDestino.tipoConta,
    };
    await this._contaService.atualizarConta(objSalvarContaOrigem).toPromise();
    await this._contaService.atualizarConta(objSalvarContaDestino).toPromise();
    this.dialogRef.close(true);
  }
}
