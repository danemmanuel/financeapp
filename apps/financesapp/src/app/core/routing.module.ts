import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const homeGestaoFinanceiraModule = () =>
  import(
    '@finances-app/src/app/modules/home-gestao-financeira/home-gestao-financeira.module'
  ).then((m) => m.HomeGestaoFinanceiraModule);

export const routers: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        loadChildren: homeGestaoFinanceiraModule,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule],
})
export class RoutingModule {}
