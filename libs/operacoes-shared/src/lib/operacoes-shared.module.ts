import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { FormularioOperacoesComponent } from './formulario-operacoes/formulario-operacoes.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
  ],
  declarations: [FormularioOperacoesComponent],
  exports: [FormularioOperacoesComponent],
  providers: [FormBuilder],
  entryComponents: [FormularioOperacoesComponent]
})
export class OperacoesSharedModule {}
