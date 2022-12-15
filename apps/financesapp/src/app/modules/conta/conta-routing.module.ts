import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContaComponent } from '@finances-app/src/app/modules/conta/conta.component';

const rotas: Routes = [
  {
    path: '',
    component: ContaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule],
})
export class ContaRoutingModule {}
