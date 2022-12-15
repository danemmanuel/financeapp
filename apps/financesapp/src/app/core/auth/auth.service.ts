import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@finances-app/src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public isAuthenticatedObs: Observable<boolean>;
  public dadosUsuario = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {
    const token = localStorage?.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  setDadosUsuario(user: any): void {
    this.dadosUsuario.next(user);
  }

  getDadosUsuario(): Observable<any> {
    return this.dadosUsuario.asObservable();
  }

  login(dados: any) {
    return this.http.post<any>(`${environment.apis.auth.signin}`, dados);
  }

  cadastro(dados: any) {
    return this.http.post<any>(`${environment.apis.auth.signup}`, dados);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  buscarConta(id) {
    return this.http.get<any>(`${environment.apis.user.user}/${id}`);
  }
}
