import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeGestaoFinanceiraComponent } from './home-gestao-financeira.component';
import { HomeGestaoFinanceiraRoutingModule } from './home-gestao-financeira-routing.module';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { SaldoEmContasComponent } from './components/saldo-em-contas/saldo-em-contas.component';
import { SaldoEmReceitasComponent } from './components/saldo-em-receitas/saldo-em-receitas.component';
import { SaldoEmDespesasComponent } from './components/saldo-em-despesas/saldo-em-despesas.component';

@NgModule({
  declarations: [HomeGestaoFinanceiraComponent, SaldoEmContasComponent, SaldoEmReceitasComponent, SaldoEmDespesasComponent],
  imports: [
    CommonModule,
    HomeGestaoFinanceiraRoutingModule,
    AngularMaterialModule,
  ],
})
export class HomeGestaoFinanceiraModule {}
