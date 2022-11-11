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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CurrencyMaskConfig } from 'ngx-currency';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';
import * as moment from 'moment';
import { OperacoesService } from '../operacoes.service';

@Component({
  selector: 'finances-app-formulario-operacoes',
  templateUrl: './formulario-operacoes.component.html',
  styleUrls: ['./formulario-operacoes.component.scss'],
})
export class FormularioOperacoesComponent implements OnInit, AfterViewInit {
  tipoOperacao = '';
  formOperacao: FormGroup;
  contas = [];
  categorias = [];
  usAmount = 0;
  @ViewChild('picker1') picker: MatDatepicker<any>;
  operacao: any;
  loading: boolean;
  hoje = new Date();
  opened = 0;
  isMobile: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<FormularioOperacoesComponent>,
    private fb: FormBuilder,
    private _contasService: ContasService,
    private _operacoesService: OperacoesService
  ) {}

  async ngOnInit() {
    this.isMobile = window.innerWidth < 768;
    this.tipoOperacao = this.data.tipoOperacao;
    this.montarFormulario();
    if (this.data.operacao) {
      this.operacao = this.data.operacao.receita || this.data.operacao.despesa;
      this.preencherFormulario();
    }

    await this.buscarContas();
  }

  ngAfterViewInit() {}

  updateUSAmount(event) {
    this.usAmount = event.target.value;
  }

  onEnter() {}
  onChange(event) {
    this.formOperacao.get('valor')?.setValue(event);
  }
  onInputFocus() {}
  onInputBlur() {}

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

  async atualizarOperacao() {
    if (this.formOperacao.invalid) return;
    this.loading = true;
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
      this.loading = false;
    }
  }

  efetivadoChange() {
    if (!this.data.operacao && !this.formOperacao.get('efetivado').value) {
      this.formOperacao.get('fixa').setValue(false);
      this.formOperacao.get('repetir').setValue(false);
      this.formOperacao.get('repetirPor').setValue(1);
    }
  }

  repetirChange() {
    if (this.formOperacao.get('repetir').value) {
      this.formOperacao.get('repetirPor').setValue(null);
    } else {
      this.formOperacao.get('repetirPor').setValue(1);
    }
  }

  montarObjetoSalvar() {
    const formValue = this.formOperacao.value;
    let obj = {
      _id: this.operacao?._id,
      descricao: formValue.descricao,
      efetivado: formValue.efetivado,
      fixa: formValue.fixa,
      valor:
        typeof formValue.valor === 'number'
          ? formValue.valor
          : +formValue.valor.replace(',', '.'),
      repetirPor: formValue.repetir ? formValue.repetirPor : 0,
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
      valor: this.fb.control(null, [Validators.required]),
      repetirPor: this.fb.control(2, []),
      repetir: this.fb.control(false),
      efetivado: this.fb.control(null),
      fixa: this.fb.control(null),
      data: this.fb.control(null, [Validators.required]),
      descricao: this.fb.control(null, [Validators.required]),
      categoria: this.fb.control(null, [Validators.required]),
      conta: this.fb.control(null, [Validators.required]),
    });

    if (this.data.tipoOperacao === 'Receita') {
      this.categorias = [
        { descricao: 'Salário', icone: 'aliment' },
        { descricao: 'Investimento', icone: 'aliment' },
        { descricao: 'Recisão', icone: 'aliment' },
        { descricao: 'Emprestimo', icone: 'aliment' },
        { descricao: 'Dividendo', icone: 'aliment' },
      ];
    } else {
      this.categorias = [
        { descricao: 'Cartão de Crédito', icone: 'alimenst' },
        { descricao: 'Alimentacao', icone: 'aliment' },
        { descricao: 'Mercado', icone: 'aliment' },
        { descricao: 'Lazer', icone: 'Lazer' },
        { descricao: 'Casa', icone: 'Lazer' },
        { descricao: 'Educação', icone: 'Lazer' },
        { descricao: 'Taxas', icone: 'Lazer' },
        { descricao: 'Saúde', icone: 'Lazer' },
        { descricao: 'Serviços', icone: 'Lazer' },
        { descricao: 'Outros', icone: 'Lazer' },
      ];
    }
  }

  async efetivarOperacao() {
    this.formOperacao.get('efetivado').setValue(true);
    this.atualizarOperacao();
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
