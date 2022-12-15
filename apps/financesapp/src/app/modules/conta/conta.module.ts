import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaComponent } from './conta.component';
import { FitCardModule } from '@finances-app/fit-card';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { OperacoesSharedModule } from '@finances-app/operacoes-shared';
import { ContaSharedModule } from '@finances-app/conta-shared';
import { ContaRoutingModule } from '@finances-app/src/app/modules/conta/conta-routing.module';

@NgModule({
  declarations: [ContaComponent],
  imports: [
    CommonModule,
    ContaRoutingModule,
    FitCardModule,
    AngularMaterialModule,
    OperacoesSharedModule,
    ContaSharedModule,
  ],
  exports: [],
})
export class ContaModule {}
