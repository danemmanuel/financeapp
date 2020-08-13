import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarReceitasComponent } from './listar-receitas/listar-receitas.component';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
import { OperacoesSharedModule } from '@finances-app/operacoes-shared';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    OperacoesSharedModule
  ],
  declarations: [ListarReceitasComponent],
  exports: [ListarReceitasComponent],
  entryComponents: [],
  providers: [FormBuilder],
})
export class ReceitasSharedModule {}
