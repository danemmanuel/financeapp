import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceitasComponent } from './receitas.component';
import { ReceitasRoutingModule } from '@finances-app/src/app/modules/receitas/receitas-routing.module';
import { FitCardModule } from '@finances-app/fit-card';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { HeaderMesModule } from '@finances-app/header-mes';
import { OperacoesSharedModule } from '@finances-app/operacoes-shared';

@NgModule({
  declarations: [ReceitasComponent],
  imports: [
    CommonModule,
    ReceitasRoutingModule,
    FitCardModule,
    AngularMaterialModule,
    HeaderMesModule,
    OperacoesSharedModule
  ],
})
export class ReceitasModule {}
