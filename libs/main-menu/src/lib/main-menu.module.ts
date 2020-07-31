import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AngularMaterialModule } from '@finances-app/angular-material';

@NgModule({
  imports: [CommonModule, AngularMaterialModule],
  declarations: [MainMenuComponent],
  exports: [MainMenuComponent],
})
export class MainMenuModule {}
