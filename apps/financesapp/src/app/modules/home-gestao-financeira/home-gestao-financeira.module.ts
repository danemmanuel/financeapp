import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeGestaoFinanceiraComponent } from './home-gestao-financeira.component';
import { HomeGestaoFinanceiraRoutingModule } from './home-gestao-financeira-routing.module';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';
import { DespesasPendentesComponent } from './components/despesas-pendentes/despesas-pendentes.component';
import { ReceitasPendentesComponent } from './components/receitas-pendentes/receitas-pendentes.component';
import { IndicativosFinanceirosComponent } from './components/indicativos-financeiros/indicativos-financeiros.component';
import { FitCardModule } from '@finances-app/fit-card';
import { HeaderMesModule } from '@finances-app/header-mes';

@NgModule({
  declarations: [
    HomeGestaoFinanceiraComponent,
    DespesasPendentesComponent,
    ReceitasPendentesComponent,
    IndicativosFinanceirosComponent,
  ],
  imports: [
    CommonModule,
    HomeGestaoFinanceiraRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    ChartModule,
    FitCardModule,
    HeaderMesModule,
  ],
})
export class HomeGestaoFinanceiraModule {}
