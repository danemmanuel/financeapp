import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';
import { FormularioDespesaComponent } from './formulario-despesa/formulario-despesa.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ListarDespesasComponent, FormularioDespesaComponent],
  exports: [ListarDespesasComponent, FormularioDespesaComponent],
})
export class DespesasSharedModule {}
