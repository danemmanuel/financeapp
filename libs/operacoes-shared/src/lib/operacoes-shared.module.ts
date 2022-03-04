import { PipesModule } from './../../../pipes/src/lib/pipes.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ListarOperacoesComponent } from '@finances-app-libs/operacoes-shared/src/lib/listar-operacoes/listar-operacoes.component';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { NgxCurrencyModule } from 'ngx-currency';
import { FormularioOperacoesComponent } from './formulario-operacoes/formulario-operacoes.component';
import { NgNumericKeyboardModule } from './ng-numeric-keyboard.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    PipesModule,
    NgNumericKeyboardModule,
  ],
  declarations: [FormularioOperacoesComponent, ListarOperacoesComponent],
  exports: [FormularioOperacoesComponent, ListarOperacoesComponent],
  providers: [FormBuilder],
  entryComponents: [FormularioOperacoesComponent],
})
export class OperacoesSharedModule {}
