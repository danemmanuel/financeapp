import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FitCardModule } from '@finances-app/fit-card';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { ReceitasSharedModule } from '@finances-app/receitas-shared';
import { HeaderMesModule } from '@finances-app/header-mes';
import { DespesasComponent } from './despesas.component';
import { DespesasRoutingModule } from '@finances-app/src/app/modules/despesas/despesas-routing.module';

@NgModule({
  declarations: [DespesasComponent],
  imports: [
    CommonModule,
    DespesasRoutingModule,
    FitCardModule,
    AngularMaterialModule,
    ReceitasSharedModule,
    HeaderMesModule
  ],
})
export class DespesasModule {}
