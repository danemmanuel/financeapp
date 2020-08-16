import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContasComponent } from '@finances-app/src/app/modules/contas/contas.component';

const rotas: Routes = [
  {
    path: '',
    component: ContasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule],
})
export class ContasRoutingModule {}
