import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContasComponent } from './contas.component';
import { ContasRoutingModule } from '@finances-app/src/app/modules/contas/contas-routing.module';
import { FitCardModule } from '@finances-app/fit-card';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { OperacoesSharedModule } from '@finances-app/operacoes-shared';
import { ContaSharedModule } from '@finances-app/conta-shared';
import { ListarContasComponent } from './listar-contas/listar-contas.component';

@NgModule({
  declarations: [ContasComponent, ListarContasComponent],
  imports: [
    CommonModule,
    ContasRoutingModule,
    FitCardModule,
    AngularMaterialModule,
    OperacoesSharedModule,
    ContaSharedModule
  ],
  exports: [ListarContasComponent]
})
export class ContasModule {}
