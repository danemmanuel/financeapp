import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeGestaoFinanceiraComponent } from './home-gestao-financeira.component';
import { HomeGestaoFinanceiraRoutingModule } from './home-gestao-financeira-routing.module';

@NgModule({
  declarations: [HomeGestaoFinanceiraComponent],
  imports: [CommonModule, HomeGestaoFinanceiraRoutingModule],
})
export class HomeGestaoFinanceiraModule {}
