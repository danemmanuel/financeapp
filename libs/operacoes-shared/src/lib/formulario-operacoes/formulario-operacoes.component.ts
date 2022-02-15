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
  categorias = [
    { descricao: 'Alimentacao', icone: 'aliment' },
    { descricao: 'Lazer', icone: 'Lazer' },
    { descricao: 'Casa', icone: 'Lazer' },
    { descricao: 'Educação', icone: 'Lazer' },
    { descricao: 'Pagamentos', icone: 'Lazer' },
    { descricao: 'Saúde', icone: 'Lazer' },
    { descricao: 'Serviços', icone: 'Lazer' },
  ];

  @ViewChild('picker1') picker: MatDatepicker<any>;
  operacao: any;
  loading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<FormularioOperacoesComponent>,
    private fb: FormBuilder,
    private _contasService: ContasService,
    private _operacoesService: OperacoesService
  ) {}

  async ngOnInit() {
    this.montarFormulario();
    await this.buscarContas();
    this.tipoOperacao = this.data.tipoOperacao;
    if (this.data.operacao) {
      this.operacao = this.data.operacao.receita || this.data.operacao.despesa;
      this.preencherFormulario();
    }
  }

  async buscarContas() {
    this.loading = true;
    this.contas = await this._contasService.buscarContas().toPromise();
    this.loading = false;
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

  async atualizarOperacao() {
    if (this.formOperacao.invalid) return;
    try {
      if (this.tipoOperacao === 'Receita') {
        await this._operacoesService
          .atualizarReceita(this.montarObjetoSalvar())
          .toPromise();
      } else if (this.tipoOperacao === 'Despesa') {
        await this._operacoesService
          .atualizarDespesa(this.montarObjetoSalvar())
          .toPromise();
      }

      this.dialogRef.close(true);
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  montarObjetoSalvar() {
    const formValue = this.formOperacao.value;

    return {
      _id: this.operacao?._id,
      descricao: formValue.descricao,
      efetivado: formValue.efetivado,
      valor: formValue.valor,
      data: moment(formValue.data).format('YYYY-MM-DD'),
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

  preencherFormulario() {
    console.log(this.operacao);

    this.formOperacao.reset({
      valor: this.operacao.valor,
      efetivado: this.operacao.efetivado,
      descricao: this.operacao.descricao,
      data: moment(this.operacao.data).format(),
      conta: this.operacao.conta,
      categoria: this.operacao.categoria,
    });
  }

  byId(item1, item2) {
    return item1._id === item2._id;
  }

  byDescricao(item1, item2) {
    return item1.descricao === item2.descricao;
  }

  montarFormulario() {
    this.formOperacao = this.fb.group({
      valor: this.fb.control(0, [Validators.required]),
      efetivado: this.fb.control(null),
      data: this.fb.control(new Date()),
      descricao: this.fb.control(null, [Validators.required]),
      categoria: this.fb.control(null, [Validators.required]),
      conta: this.fb.control(null, [Validators.required]),
    });
  }
}
