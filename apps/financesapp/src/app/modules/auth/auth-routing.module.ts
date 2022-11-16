import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const rotas: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path: 'succes/:jwt',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
