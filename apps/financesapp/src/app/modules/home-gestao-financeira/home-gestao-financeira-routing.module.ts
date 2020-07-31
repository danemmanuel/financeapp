import { HomeGestaoFinanceiraComponent } from './home-gestao-financeira.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const rotas: Routes = [
  {
    path: '',
    component: HomeGestaoFinanceiraComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule],
})
export class HomeGestaoFinanceiraRoutingModule {}
