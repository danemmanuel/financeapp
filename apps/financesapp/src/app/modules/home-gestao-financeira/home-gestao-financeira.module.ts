import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeGestaoFinanceiraComponent } from './home-gestao-financeira.component';
import { HomeGestaoFinanceiraRoutingModule } from './home-gestao-financeira-routing.module';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { HttpClientModule } from '@angular/common/http';
import { IndicativosFinanceirosComponent } from './components/indicativos-financeiros/indicativos-financeiros.component';
import { FitCardModule } from '@finances-app/fit-card';
import { OperacoesSharedModule } from '@finances-app/operacoes-shared';
import {NgxEchartsModule} from "ngx-echarts";
import {ContasModule} from "@finances-app/src/app/modules/contas/contas.module";

@NgModule({
  declarations: [
    HomeGestaoFinanceiraComponent,
    IndicativosFinanceirosComponent,
  ],
  imports: [
    CommonModule,
    HomeGestaoFinanceiraRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    FitCardModule,
    OperacoesSharedModule,
    ContasModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
})
export class HomeGestaoFinanceiraModule {}
