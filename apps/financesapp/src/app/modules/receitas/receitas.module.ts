import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceitasComponent } from './receitas.component';
import { ReceitasRoutingModule } from '@finances-app/src/app/modules/receitas/receitas-routing.module';
import { FitCardModule } from '@finances-app/fit-card';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { ReceitasSharedModule } from '@finances-app/receitas-shared';
import { HeaderMesModule } from '@finances-app/header-mes';

@NgModule({
  declarations: [ReceitasComponent],
  imports: [
    CommonModule,
    ReceitasRoutingModule,
    FitCardModule,
    AngularMaterialModule,
    ReceitasSharedModule,
    HeaderMesModule
  ],
})
export class ReceitasModule {}
