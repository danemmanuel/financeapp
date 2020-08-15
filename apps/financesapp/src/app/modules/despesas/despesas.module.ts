import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FitCardModule } from '@finances-app/fit-card';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { HeaderMesModule } from '@finances-app/header-mes';
import { DespesasComponent } from './despesas.component';
import { DespesasRoutingModule } from '@finances-app/src/app/modules/despesas/despesas-routing.module';
import { OperacoesSharedModule } from '@finances-app/operacoes-shared';

@NgModule({
  declarations: [DespesasComponent],
  imports: [
    CommonModule,
    DespesasRoutingModule,
    FitCardModule,
    AngularMaterialModule,
    HeaderMesModule,
    OperacoesSharedModule
  ],
})
export class DespesasModule {}
