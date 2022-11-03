import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceitasComponent } from './receitas.component';
import { ReceitasRoutingModule } from '@finances-app/src/app/modules/receitas/receitas-routing.module';
import { FitCardModule } from '@finances-app/fit-card';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { OperacoesSharedModule } from '@finances-app/operacoes-shared';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [ReceitasComponent],
  imports: [
    CommonModule,
    ReceitasRoutingModule,
    FitCardModule,
    AngularMaterialModule,
    OperacoesSharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
})
export class ReceitasModule {}
