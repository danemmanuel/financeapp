import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const rotas: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
