import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'finances-app-formulario-receita',
  templateUrl: './formulario-receita.component.html',
  styleUrls: ['./formulario-receita.component.scss'],
})
export class FormularioReceitaComponent implements OnInit {
  formReceita: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<FormularioReceitaComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.montarFormulario();
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
