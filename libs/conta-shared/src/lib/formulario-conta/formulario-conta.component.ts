import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { CurrencyMaskConfig } from 'ngx-currency';

@Component({
  selector: 'finances-app-formulario-conta',
  templateUrl: './formulario-conta.component.html',
  styleUrls: ['./formulario-conta.component.scss'],
})
export class FormularioContaComponent implements OnInit {
  formConta: FormGroup;
  tipoOperacao;
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<FormularioContaComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.montarFormulario();
    this.tipoOperacao = this.data.tipoOperacao;
  }

  montarFormulario() {
    this.formConta = this.fb.group({
      saldo: this.fb.control(null, [Validators.required]),
      recebido: this.fb.control(null),
      data: this.fb.control(new Date()),
      descricao: this.fb.control(null),
      categoria: this.fb.control(null, [Validators.required]),
      instituicaoFinanceira: this.fb.control(null, [Validators.required]),
    });
  }
}
