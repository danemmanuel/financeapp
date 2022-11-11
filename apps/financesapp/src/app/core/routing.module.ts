import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeModule } from '@finances-app/src/app/modules/home/home.module';
import { ContasGuard } from '@finances-app/src/app/core/auth/contas.guard';

const homeGestaoFinanceiraModule =
  '../../modules/home-gestao-financeira/home-gestao-financeira.module#HomeGestaoFinanceiraModule';

const receitasModule =
  '@finances-app/src/app/modules/receitas/receitas.module#ReceitasModule';

const despesasModule =
  '@finances-app/src/app/modules/despesas/despesas.module#DespesasModule';

const contasModule =
  '@finances-app/src/app/modules/contas/contas.module#ContasModule';

const authModule = '@finances-app/src/app/modules/auth/auth.module#AuthModule';
const homeModule = '../modules/home/home.module#HomeModule';

export const routers: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../modules/home/home.module').then((x) => {
        return x.HomeModule;
      }),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../modules/auth/auth.module').then((x) => x.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import(
            '../modules/home-gestao-financeira/home-gestao-financeira.module'
            ).then((x) => x.HomeGestaoFinanceiraModule),
      },
      {
        path: 'home/:redirect',
        loadChildren: () =>
          import(
            '../modules/home-gestao-financeira/home-gestao-financeira.module'
          ).then((x) => x.HomeGestaoFinanceiraModule),
      },
      {
        path: 'receitas',
        loadChildren: () =>
          import('../modules/receitas/receitas.module').then(
            (x) => x.ReceitasModule
          ),
        canActivate: [ContasGuard],
      },
      {
        path: 'despesas',
        loadChildren: () =>
          import('../modules/despesas/despesas.module').then(
            (x) => x.DespesasModule
          ),
        canActivate: [ContasGuard],
      },
      {
        path: 'contas',
        loadChildren: () =>
          import('../modules/contas/contas.module').then((x) => x.ContasModule),
      },
      {
        path: 'relatorios',
        loadChildren: () =>
          import('../modules/relatorios/relatorios.module').then(
            (x) => x.RelatoriosModule
          ),
        canActivate: [ContasGuard],
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
