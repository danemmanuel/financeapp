import { PipesModule } from './../../../pipes/src/lib/pipes.module';
import {CommonModule, CurrencyPipe} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarOperacoesComponent } from '@finances-app-libs/operacoes-shared/src/lib/listar-operacoes/listar-operacoes.component';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { FormularioOperacoesComponent } from './formulario-operacoes/formulario-operacoes.component';

let CustomCurrencyMaskConfig = {
  align: 'left',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL,
};

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    PipesModule,
    FormsModule,
    NgxCurrencyModule.forRoot(CustomCurrencyMaskConfig),
  ],
  declarations: [FormularioOperacoesComponent, ListarOperacoesComponent],
  exports: [FormularioOperacoesComponent, ListarOperacoesComponent],
  providers: [FormBuilder, CurrencyPipe],
})
export class OperacoesSharedModule {}
