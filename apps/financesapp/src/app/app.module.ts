import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MainMenuModule } from '@finances-app/main-menu';
import { RoutingModule } from '@finances-app/src/app/core/routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/auth/auth.guard';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import localePt from '@angular/common/locales/pt';
import { HeaderMesModule } from '@finances-app-libs/header-mes/src';

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MainMenuModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpClientModule,
    HeaderMesModule,
  ],
  providers: [
    AuthGuard,
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
