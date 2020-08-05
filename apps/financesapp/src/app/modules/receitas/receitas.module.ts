import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceitasComponent } from './receitas.component';
import { ReceitasRoutingModule } from '@finances-app/src/app/modules/receitas/receitas-routing.module';
import { FitCardModule } from '@finances-app/fit-card';

@NgModule({
  declarations: [ReceitasComponent],
  imports: [CommonModule, ReceitasRoutingModule, FitCardModule]
})
export class ReceitasModule {
}
