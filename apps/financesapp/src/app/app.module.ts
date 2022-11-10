import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { RoutingModule } from '@finances-app/src/app/core/routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/auth/auth.guard';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import localePt from '@angular/common/locales/pt';
import { AuthModule } from './modules/auth/auth.module';
import { HeaderMesComponent } from '@finances-app/header-mes';
import { MainMenuComponent } from '@finances-app/main-menu';
import {ContasGuard} from "@finances-app/src/app/core/auth/contas.guard";

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MainMenuComponent,
    BrowserAnimationsModule,
    RoutingModule,
    HttpClientModule,
    AuthModule,
    HeaderMesComponent,
  ],
  providers: [
    AuthGuard,
    ContasGuard,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
