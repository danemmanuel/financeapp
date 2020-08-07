import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeGestaoFinanceiraComponent } from './home-gestao-financeira.component';
import { HomeGestaoFinanceiraRoutingModule } from './home-gestao-financeira-routing.module';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';
import { DespesasPendentesComponent } from './components/despesas-pendentes/despesas-pendentes.component';
import { IndicativosFinanceirosComponent } from './components/indicativos-financeiros/indicativos-financeiros.component';
import { FitCardModule } from '@finances-app/fit-card';
import { HeaderMesModule } from '@finances-app/header-mes';
import { ReceitasSharedModule } from '@finances-app/receitas-shared';

@NgModule({
  declarations: [
    HomeGestaoFinanceiraComponent,
    DespesasPendentesComponent,
    IndicativosFinanceirosComponent,
  ],
  imports: [
    CommonModule,
    HomeGestaoFinanceiraRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    ChartModule,
    FitCardModule,
    ReceitasSharedModule,
    HeaderMesModule,
  ],
})
export class HomeGestaoFinanceiraModule {}
