import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeGestaoFinanceiraModule } from './modules/home-gestao-financeira/home-gestao-financeira.module';
import { MainMenuModule } from '@finances-app/main-menu';
import { RoutingModule } from '@finances-app/src/app/core/routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MainMenuModule, BrowserAnimationsModule, HomeGestaoFinanceiraModule, RoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
