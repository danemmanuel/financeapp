import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FitCardComponent } from './fit-card/fit-card.component';
import { AngularMaterialModule } from '@finances-app/angular-material';

@NgModule({
  imports: [CommonModule, AngularMaterialModule],
  declarations: [FitCardComponent],
  exports: [FitCardComponent],
})
export class FitCardModule {}
