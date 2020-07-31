import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceitasComponent } from '@finances-app/src/app/modules/receitas/receitas.component';

const rotas: Routes = [
  {
    path: '',
    component: ReceitasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule],
})
export class ReceitasRoutingModule {}
