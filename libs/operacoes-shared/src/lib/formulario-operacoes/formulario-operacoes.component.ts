import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrencyMaskConfig } from 'ngx-currency';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';
@Component({
  selector: 'finances-app-formulario-operacoes',
  templateUrl: './formulario-operacoes.component.html',
  styleUrls: ['./formulario-operacoes.component.scss'],
})
export class FormularioOperacoesComponent implements OnInit {
  tipoOperacao = '';
  formReceita: FormGroup;
  contas = [];
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

  @ViewChild('picker1') picker: MatDatepicker<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<FormularioOperacoesComponent>,
    private fb: FormBuilder,
    private _contasService: ContasService
  ) {}

  ngOnInit(): void {
    this.buscarContas();
    this.montarFormulario();
    this.tipoOperacao = this.data.tipoOperacao;
  }

  async buscarContas() {
    this.contas = await this._contasService.buscarContas().toPromise();
  }

  salvarReceita() {
    if (this.formReceita.invalid) return;
  }

  setHoje() {
    this.formReceita.get('data').setValue(new Date());
  }

  setOntem() {
    const data = new Date();
    data.setDate(data.getDate() - 1);
    this.formReceita.get('data').setValue(data);
  }

  setAmanha() {
    const data = new Date();
    data.setDate(data.getDate() + 1);
    this.formReceita.get('data').setValue(data);
  }

  montarFormulario() {
    this.formReceita = this.fb.group({
      valor: this.fb.control(null, [Validators.required]),
      recebido: this.fb.control(null),
      data: this.fb.control(new Date()),
      descricao: this.fb.control(null),
      categoria: this.fb.control(null, [Validators.required]),
      instituicaoFinanceira: this.fb.control(null, [Validators.required]),
    });
  }
}
