import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private _authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      // add authorization header with jwt token if available
      let currentUser = this._authService.currentUserValue;
      if (currentUser?.token) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${currentUser.token}`
              }
          });
      } else {
        this.router.navigate([''])
      }

      return next.handle(request);
  }
}
