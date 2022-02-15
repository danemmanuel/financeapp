import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@finances-app-libs/pipes/src/lib/pipes.module';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { ContaSharedModule } from '@finances-app/conta-shared';
import { FitCardModule } from '@finances-app/fit-card';
import { HeaderMesModule } from '@finances-app/header-mes';
import { OperacoesSharedModule } from '@finances-app/operacoes-shared';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FitCardModule,
    AngularMaterialModule,
    HeaderMesModule,
    OperacoesSharedModule,
    ContaSharedModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [AuthComponent],
})
export class AuthModule {}
