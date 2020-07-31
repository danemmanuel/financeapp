import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const homeGestaoFinanceiraModule = () =>
  import(
    '@finances-app/src/app/modules/home-gestao-financeira/home-gestao-financeira.module'
  ).then((m) => m.HomeGestaoFinanceiraModule);

const receitasModule = () =>
  import('@finances-app/src/app/modules/receitas/receitas.module').then(
    (m) => m.ReceitasModule
  );

export const routers: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: 'home',
        loadChildren: homeGestaoFinanceiraModule,
      },
      {
        path: 'receitas',
        loadChildren: receitasModule,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule],
})
export class RoutingModule {}
