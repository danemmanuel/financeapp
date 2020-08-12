import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'finances-app-formulario-receita',
  templateUrl: './formulario-receita.component.html',
  styleUrls: ['./formulario-receita.component.scss'],
})
export class FormularioReceitaComponent implements OnInit {
  formReceita: FormGroup;
  filteredStates: Observable<any[]>;
  states = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag:
        'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag:
        'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg',
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag:
        'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg',
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag:
        'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg',
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<FormularioReceitaComponent>,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.montarFormulario();
    this.filteredStates = this.formReceita.get('categoria').valueChanges.pipe(
      startWith(''),
      map((state) => (state ? this._filterStates(state) : this.states.slice()))
    );
  }

  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(
      (state) => state.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  montarFormulario() {
    this.formReceita = this.fb.group({
      valor: this.fb.control(null, [Validators.required]),
      recebido: this.fb.control(null),
      data: this.fb.control(null),
      descricao: this.fb.control(null),
      categoria: this.fb.control(null),
      instituicaoFinanceira: this.fb.control(null),
    });
  }
}
