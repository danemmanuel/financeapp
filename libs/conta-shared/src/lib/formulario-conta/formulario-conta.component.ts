import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map, startWith } from 'rxjs/operators';
import { CurrencyMaskConfig } from 'ngx-currency';
import { Observable } from 'rxjs';
import { COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ContasService } from '../contas.service';

@Component({
  selector: 'finances-app-formulario-conta',
  templateUrl: './formulario-conta.component.html',
  styleUrls: ['./formulario-conta.component.scss'],
})
export class FormularioContaComponent implements OnInit {
  formConta: FormGroup;
  tipoOperacao;
  allInstituicoes: string[] = ['Nubank', 'Neon', 'Bradesco', 'C6'];
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<FormularioContaComponent>,
    private fb: FormBuilder,
    private _contaService: ContasService
  ) {}

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 768;
    this.montarFormulario();
    this.tipoOperacao = this.data.tipoOperacao;

    if (this.data.conta) {
      this.preencherFormulario();
    }
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
      instituicao: this.fb.control(null, [Validators.required]),
      tipoConta: this.fb.control(null, [Validators.required]),
    });
  }

  async enviarFormulario() {
    if (this.formConta.invalid) return;

    let formValue = this.formConta.value;
    let objSalvar = {
      _id: this.data.conta?._id,
      saldo:
        typeof formValue.saldo === 'number'
          ? formValue.saldo
          : +formValue.saldo.replace(',', '.'),
      instituicao: formValue.instituicao,
      tipoConta: formValue.tipoConta,
    };
    if (this.data?.conta) {
      await this._contaService.atualizarConta(objSalvar).toPromise();
      this.dialogRef.close(true);
    } else {
      await this._contaService.cadastrarConta(objSalvar).toPromise();
      this.dialogRef.close(true);
    }
  }
}
