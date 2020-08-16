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

const despesasModule = () =>
  import('@finances-app/src/app/modules/despesas/despesas.module').then(
    (m) => m.DespesasModule
  );

const contasModule = () =>
  import('@finances-app/src/app/modules/contas/contas.module').then(
    (m) => m.ContasModule
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
      {
        path: 'despesas',
        loadChildren: despesasModule,
      },
      {
        path: 'contas',
        loadChildren: contasModule,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule],
})
export class RoutingModule {}
