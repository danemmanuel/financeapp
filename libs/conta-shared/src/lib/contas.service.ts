import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@finances-app/src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContasService {
  private contas = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {}

  setConta(user: any): void {
    this.contas.next(user);
  }

  getConta(): Observable<any> {
    return this.contas.asObservable();
  }

  cadastrarConta(dados: any) {
    return this.http.post<any>(`${environment.apis.conta.conta}`, dados);
  }

  atualizarConta(dados: any) {
    return this.http.put<any>(`${environment.apis.conta.conta}`, dados);
  }

  buscarContas() {
    return this.http.get<any>(`${environment.apis.conta.conta}`);
  }
}
