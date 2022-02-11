import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@finances-app/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OperacoesService {
  constructor(private http: HttpClient) {}

  cadastrarDespesa(dados: any) {
    return this.http.post<any>(`${environment.apis.despesa.despesa}`, dados);
  }

  cadastrarReceita(dados: any) {
    return this.http.post<any>(`${environment.apis.receita.receita}`, dados);
  }

  atualizarReceita(dados: any) {
    return this.http.put<any>(`${environment.apis.receita.receita}`, dados);
  }

  atualizarDespesa(dados: any) {
    return this.http.put<any>(`${environment.apis.despesa.despesa}`, dados);
  }

  buscarDespesas(filtros) {
    return this.http.get<any>(`${environment.apis.despesa.despesa}`, {
      params: filtros,
    });
  }

  buscarReceitas(filtros) {
    return this.http.get<any>(`${environment.apis.receita.receita}`, {
      params: filtros,
    });
  }
}
