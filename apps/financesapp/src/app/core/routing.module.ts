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

const authModule = '@finances-app/src/app/modules/auth/auth.module#AuthModule';
const homeModule = '@finances-app/src/app/modules/home/home.module#HomeModule';

export const routers: Routes = [
  { path: '', loadChildren: homeModule },
  { path: 'login', loadChildren: authModule },
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
