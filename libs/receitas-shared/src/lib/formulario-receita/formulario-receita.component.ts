import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'finances-app-formulario-receita',
  templateUrl: './formulario-receita.component.html',
  styleUrls: ['./formulario-receita.component.scss'],
})
export class FormularioReceitaComponent implements OnInit {
  formReceita: FormGroup;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [COMMA];
  filteredFruits: Observable<string[]>;
  filteredInstituicoes: Observable<string[]>;
  fruits: string[] = ['Salário'];
  instituicaoFinanceira: string[] = ['Nubank'];
  allFruits: string[] = ['Salário', 'Bonificação', 'Investimento'];
  allInstituicoes: string[] = ['Nubank', 'Neon', 'Bradesco'];

  @ViewChild('picker1') picker: MatDatepicker<any>;
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('instituicaoInput') instituicaoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('autoInstituicao') matAutocompleteInstituicao: MatAutocomplete;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<FormularioReceitaComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.montarFormulario();
    this.filteredFruits = this.formReceita.get('categoria').valueChanges.pipe(
      startWith(''),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allFruits.slice()
      )
    );

    this.filteredInstituicoes = this.formReceita
      .get('instituicaoFinanceira')
      .valueChanges.pipe(
        startWith(''),
        map((fruit: string | null) =>
          fruit ? this._filterInstituicao(fruit) : this.allInstituicoes.slice()
        )
      );
  }

  addInstituicao(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.instituicaoFinanceira.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.formReceita.get('instituicaoFinanceira').setValue(null);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.formReceita.get('categoria').setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  removeInstituicao(fruit: string): void {
    const index = this.instituicaoFinanceira.indexOf(fruit);

    if (index >= 0) {
      this.instituicaoFinanceira.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.formReceita.get('categoria').setValue(null);
  }

  selectedInstituicao(event: MatAutocompleteSelectedEvent): void {
    this.instituicaoFinanceira.push(event.option.viewValue);
    this.instituicaoInput.nativeElement.value = '';
    this.formReceita.get('instituicaoFinanceira').setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(
      (fruit) => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private _filterInstituicao(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allInstituicoes.filter(
      (fruit) => fruit.toLowerCase().indexOf(filterValue) === 0
    );
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
