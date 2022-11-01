import { PipesModule } from './../../../pipes/src/lib/pipes.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarOperacoesComponent } from '@finances-app-libs/operacoes-shared/src/lib/listar-operacoes/listar-operacoes.component';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { NgxCurrencyModule } from 'ngx-currency';
import { FormularioOperacoesComponent } from './formulario-operacoes/formulario-operacoes.component';
import { NgNumericKeyboardModule } from './ng-numeric-keyboard.module';
import { MatCurrencyFormatModule } from 'mat-currency-format';
@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    PipesModule,
    NgNumericKeyboardModule,
    FormsModule,
    MatCurrencyFormatModule,
  ],
  declarations: [FormularioOperacoesComponent, ListarOperacoesComponent],
  exports: [FormularioOperacoesComponent, ListarOperacoesComponent],
  providers: [FormBuilder],
})
export class OperacoesSharedModule {}
