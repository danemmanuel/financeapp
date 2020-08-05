import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeGestaoFinanceiraComponent } from './home-gestao-financeira.component';
import { HomeGestaoFinanceiraRoutingModule } from './home-gestao-financeira-routing.module';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { SaldoEmContasComponent } from './components/saldo-em-contas/saldo-em-contas.component';
import { SaldoEmReceitasComponent } from './components/saldo-em-receitas/saldo-em-receitas.component';
import { SaldoEmDespesasComponent } from './components/saldo-em-despesas/saldo-em-despesas.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';
import { DespesasPendentesComponent } from './components/despesas-pendentes/despesas-pendentes.component';
import { ReceitasPendentesComponent } from './components/receitas-pendentes/receitas-pendentes.component';
import { IndicativosFinanceirosComponent } from './components/indicativos-financeiros/indicativos-financeiros.component';
import { FitCardModule } from '@finances-app/fit-card';

@NgModule({
  declarations: [
    HomeGestaoFinanceiraComponent,
    SaldoEmContasComponent,
    SaldoEmReceitasComponent,
    SaldoEmDespesasComponent,
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
  ],
})
export class HomeGestaoFinanceiraModule {}
