import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioContaComponent } from './formulario-conta/formulario-conta.component';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { MatCurrencyFormatModule } from 'mat-currency-format';
import { PipesModule } from '@finances-app/pipes';
import { FormularioTransferenciaContaComponent } from '@finances-app-libs/conta-shared/src/lib/formulario-transferencia-conta/formulario-transferencia-conta.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    MatCurrencyFormatModule,
    PipesModule,
  ],
  declarations: [
    FormularioContaComponent,
    FormularioTransferenciaContaComponent,
  ],
  exports: [FormularioContaComponent, FormularioTransferenciaContaComponent],
})
export class ContaSharedModule {}
