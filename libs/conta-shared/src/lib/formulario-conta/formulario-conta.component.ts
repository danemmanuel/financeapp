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
  allInstituicoes: string[] = ['Nubank', 'Neon', 'Bradesco'];
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<FormularioContaComponent>,
    private fb: FormBuilder,
    private _contaService: ContasService
  ) {}

  ngOnInit(): void {
    this.montarFormulario();
    this.tipoOperacao = this.data.tipoOperacao;
  }

  montarFormulario() {
    this.formConta = this.fb.group({
      saldo: this.fb.control(null, [Validators.required]),
      descricao: this.fb.control(null),
      instituicaoFinanceira: this.fb.control(null, [Validators.required]),
      tipoConta: this.fb.control(null, [Validators.required]),
    });

    this.filteredInstituicoes = this.formConta
      .get('instituicaoFinanceira')
      .valueChanges.pipe(
        startWith(''),
        map((instituicao: string | null) =>
          instituicao
            ? this._filterInstituicao(instituicao)
            : this.allInstituicoes.slice()
        )
      );
  }

  private _filterInstituicao(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allInstituicoes.filter(
      (fruit) => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }

  removeInstituicao(fruit: string): void {
    const index = this.instituicaoFinanceira.indexOf(fruit);

    if (index >= 0) {
      this.instituicaoFinanceira.splice(index, 1);
    }
  }

  addInstituicao(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.instituicaoFinanceira.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.formConta.get('instituicaoFinanceira').setValue(null);
  }

  selectedInstituicao(event: MatAutocompleteSelectedEvent): void {
    this.instituicaoFinanceira.push(event.option.viewValue);
    this.instituicaoInput.nativeElement.value = '';
    this.formConta.get('instituicaoFinanceira').setValue(null);
  }

  async enviarFormulario() {
    let objSalvar = {
      saldo: 12121.11,
      instituicao: 'Neon',
      tipoConta: 'Guardando',
    };
    await this._contaService.cadastrarConta(objSalvar).toPromise();
  }
}
