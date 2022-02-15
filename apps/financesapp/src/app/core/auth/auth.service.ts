import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@finances-app/src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public isAuthenticatedObs: Observable<boolean>;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {
    const token = localStorage?.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(dados: any) {
    return this.http.post<any>(`${environment.apis.auth.signin}`, dados);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
