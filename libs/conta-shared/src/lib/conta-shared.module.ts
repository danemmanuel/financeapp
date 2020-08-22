import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioContaComponent } from './formulario-conta/formulario-conta.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FormularioContaComponent],
  exports: [FormularioContaComponent],
})
export class ContaSharedModule {}
