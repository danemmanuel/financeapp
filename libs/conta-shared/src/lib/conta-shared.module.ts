import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioContaComponent } from './formulario-conta/formulario-conta.component';
import { AngularMaterialModule } from '@finances-app/angular-material';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
    imports: [
        CommonModule,
        AngularMaterialModule,
        ReactiveFormsModule,
        NgxCurrencyModule,
    ],
    declarations: [FormularioContaComponent],
    exports: [FormularioContaComponent]
})
export class ContaSharedModule {}
