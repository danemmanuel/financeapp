import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DespesasComponent } from '@finances-app/src/app/modules/despesas/despesas.component';

const rotas: Routes = [
  {
    path: '',
    component: DespesasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule],
})
export class DespesasRoutingModule {}
