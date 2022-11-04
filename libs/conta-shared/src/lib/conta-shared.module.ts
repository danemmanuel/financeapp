import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioContaComponent } from './formulario-conta/formulario-conta.component';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { ReactiveFormsModule } from '@angular/forms';
import {CurrencyMaskInputMode, NgxCurrencyModule} from 'ngx-currency';
import { PipesModule } from '@finances-app/pipes';
import { FormularioTransferenciaContaComponent } from '@finances-app-libs/conta-shared/src/lib/formulario-transferencia-conta/formulario-transferencia-conta.component';

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
    NgxCurrencyModule.forRoot(CustomCurrencyMaskConfig),
  ],
  declarations: [
    FormularioContaComponent,
    FormularioTransferenciaContaComponent,
  ],
  exports: [FormularioContaComponent, FormularioTransferenciaContaComponent],
})
export class ContaSharedModule {}
