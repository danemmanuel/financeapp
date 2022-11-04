import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FitCardModule } from '@finances-app/fit-card';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { OperacoesSharedModule } from '@finances-app/operacoes-shared';
import { NgxEchartsModule } from 'ngx-echarts';
import { RelatoriosComponent } from '@finances-app/src/app/modules/relatorios/relatorios.component';
import { RelatoriosRoutingModule } from '@finances-app/src/app/modules/relatorios/relatorios-routing.module';
import { ReceitaXDespesaComponent } from '@finances-app/src/app/modules/relatorios/receita-x-despesa/receita-x-despesa.component';

@NgModule({
  declarations: [RelatoriosComponent, ReceitaXDespesaComponent],
  imports: [
    CommonModule,
    FitCardModule,
    AngularMaterialModule,
    OperacoesSharedModule,
    RelatoriosRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
})
export class RelatoriosModule {}
