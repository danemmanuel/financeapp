import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrencyMaskConfig } from 'ngx-currency';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';
import * as moment from 'moment';
import { OperacoesService } from '../operacoes.service';
@Component({
  selector: 'finances-app-formulario-operacoes',
  templateUrl: './formulario-operacoes.component.html',
  styleUrls: ['./formulario-operacoes.component.scss'],
})
export class FormularioOperacoesComponent implements OnInit {
  tipoOperacao = '';
  formOperacao: FormGroup;
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
  categorias = [{ descricao: 'Alimentacao', icone: 'aliment' }];

  @ViewChild('picker1') picker: MatDatepicker<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<FormularioOperacoesComponent>,
    private fb: FormBuilder,
    private _contasService: ContasService,
    private _operacoesService: OperacoesService
  ) {}

  ngOnInit(): void {
    this.buscarContas();
    this.montarFormulario();
    this.tipoOperacao = this.data.tipoOperacao;
  }

  async buscarContas() {
    this.contas = await this._contasService.buscarContas().toPromise();
  }

  async salvarOperacao() {
    if (this.formOperacao.invalid) return;
    try {
      if (this.tipoOperacao === 'Receita') {
        await this._operacoesService
          .cadastrarReceita(this.montarObjetoSalvar())
          .toPromise();
      } else if (this.tipoOperacao === 'Despesa') {
        await this._operacoesService
          .cadastrarDespesa(this.montarObjetoSalvar())
          .toPromise();
      }

      this.dialogRef.close(true);
    } catch (e) {
    } finally {
    }
  }

  montarObjetoSalvar() {
    const formValue = this.formOperacao.value;

    return {
      descricao: formValue.descricao,
      efetivado: formValue.efetivado,
      valor: formValue.valor,
      data: moment(formValue.data).format('DD-MM-YYYY'),
      categoria: formValue.categoria,
      conta: formValue.conta,
    };
  }

  setHoje() {
    this.formOperacao.get('data').setValue(new Date());
  }

  setOntem() {
    const data = new Date();
    data.setDate(data.getDate() - 1);
    this.formOperacao.get('data').setValue(data);
  }

  setAmanha() {
    const data = new Date();
    data.setDate(data.getDate() + 1);
    this.formOperacao.get('data').setValue(data);
  }

  montarFormulario() {
    this.formOperacao = this.fb.group({
      valor: this.fb.control(null, [Validators.required]),
      efetivado: this.fb.control(null),
      data: this.fb.control(new Date()),
      descricao: this.fb.control(null, [Validators.required]),
      categoria: this.fb.control(null, [Validators.required]),
      conta: this.fb.control(null, [Validators.required]),
    });
  }
}
