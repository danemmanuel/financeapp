import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatoriosComponent } from '@finances-app/src/app/modules/relatorios/relatorios.component';

const rotas: Routes = [
  {
    path: '',
    component: RelatoriosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule],
})
export class RelatoriosRoutingModule {}
