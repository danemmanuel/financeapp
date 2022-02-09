import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { AngularMaterialModule } from '@finances-app-libs/angular-material/src';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, AngularMaterialModule],
})
export class HomeModule {}
