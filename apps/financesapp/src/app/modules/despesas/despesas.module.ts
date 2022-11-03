import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FitCardModule } from '@finances-app/fit-card';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { DespesasComponent } from './despesas.component';
import { DespesasRoutingModule } from '@finances-app/src/app/modules/despesas/despesas-routing.module';
import { OperacoesSharedModule } from '@finances-app/operacoes-shared';
import {NgxEchartsModule} from "ngx-echarts";

@NgModule({
  declarations: [DespesasComponent],
  imports: [
    CommonModule,
    DespesasRoutingModule,
    FitCardModule,
    AngularMaterialModule,
    OperacoesSharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
})
export class DespesasModule {}
