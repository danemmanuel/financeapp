import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const homeGestaoFinanceiraModule =
  '@finances-app/src/app/modules/home-gestao-financeira/home-gestao-financeira.module#HomeGestaoFinanceiraModule';

const receitasModule =
  '@finances-app/src/app/modules/receitas/receitas.module#ReceitasModule';

const despesasModule =
  '@finances-app/src/app/modules/despesas/despesas.module#DespesasModule';

const contasModule =
  '@finances-app/src/app/modules/contas/contas.module#ContasModule';

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
  imports: [
    RouterModule.forRoot(routers, { relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule],
})
export class RoutingModule {}
