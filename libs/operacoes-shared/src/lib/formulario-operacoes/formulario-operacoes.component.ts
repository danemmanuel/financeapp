import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrencyMaskConfig } from 'ngx-currency';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';
import * as moment from 'moment';
import { OperacoesService } from '../operacoes.service';
import { MatInput } from '@angular/material/input';
@Component({
  selector: 'finances-app-formulario-operacoes',
  templateUrl: './formulario-operacoes.component.html',
  styleUrls: ['./formulario-operacoes.component.scss'],
})
export class FormularioOperacoesComponent implements OnInit, AfterViewInit {
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
  @ViewChild('valor') valorInput: ElementRef;
  categorias = [
    { descricao: 'Cartão de Crédito', icone: 'aliment' },
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
  hoje = new Date();
  opened = 0;
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
    setTimeout(() => {
      this.valorInput.nativeElement.focus();
    }, 500);
  }

  ngAfterViewInit() {
    this.valorInput?.nativeElement?.focus();
  }

  onEnter() {}
  onChange(event) {
    this.formOperacao.get('valor')?.setValue(event);
    console.log(event);
  }
  onInputFocus() {}
  onInputBlur() {}

  increment() {
    this.opened = this.opened + 1;
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
      console.log(e);
    } finally {
    }
  }

  efetivadoChange() {
    if (!this.data.operacao && !this.formOperacao.get('efetivado').value) {
      this.formOperacao.get('fixa').setValue(false);
    }
  }

  repetirChange() {
    if (this.formOperacao.get('repetir').value) {
      this.formOperacao.get('repetirPor').setValue(null);
    } else {
      this.formOperacao.get('repetirPor').setValue(2);
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
    let obj = {
      _id: this.operacao?._id,
      descricao: formValue.descricao,
      efetivado: formValue.efetivado,
      fixa: formValue.fixa,
      valor: formValue.valor,
      repetirPor: formValue.repetirPor || 1,
      data: moment(formValue.data).format('YYYY-MM-DD'),
      categoria: formValue.categoria,
      conta: formValue.conta,
    };
    if (formValue.fixa && this.data.operacao) {
      obj['excluirData'] = [
        ...this.operacao?.excluirData,
        moment(formValue.data).format('YYYY-MM-DD'),
      ];
    }
    return obj;
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
    this.formOperacao.reset({
      valor: this.operacao.valor,
      efetivado: this.operacao.efetivado,
      fixa: this.operacao.fixa,
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
      repetirPor: this.fb.control(2, [Validators.min(2)]),
      repetir: this.fb.control(false),
      efetivado: this.fb.control(null),
      fixa: this.fb.control(null),
      data: this.fb.control(null),
      descricao: this.fb.control(null, [Validators.required]),
      categoria: this.fb.control(null, [Validators.required]),
      conta: this.fb.control(null, [Validators.required]),
    });
  }

  async deletarOperacao() {
    if (this.tipoOperacao === 'Receita') {
      await this._operacoesService.deletarReceita(this.operacao).toPromise();
    } else {
      await this._operacoesService.deletarDespesa(this.operacao).toPromise();
    }
    this.dialogRef.close(true);
  }
}
