import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@finances-app/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContasService {
  constructor(private http: HttpClient) {}

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
