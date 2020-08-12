import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarReceitasComponent } from './listar-receitas/listar-receitas.component';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { FormularioReceitaComponent } from './formulario-receita/formulario-receita.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
  declarations: [ListarReceitasComponent, FormularioReceitaComponent],
  exports: [ListarReceitasComponent, FormularioReceitaComponent],
  entryComponents: [FormularioReceitaComponent],
  providers: [FormBuilder]
})
export class ReceitasSharedModule {}
