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

  deletarDespesa(operacao: any) {
    return this.http.delete<any>(
      `${environment.apis.despesa.despesa}/${operacao._id}`
    );
  }

  deletarReceita(operacao: any) {
    return this.http.delete<any>(
      `${environment.apis.receita.receita}/${operacao._id}`
    );
  }

  calcularOperacoes(todasOperacoes, mes, ano) {
    return todasOperacoes
      ?.filter((operacao) => {
        const data = new Date(operacao.data);
        data.setDate(data.getDate() + 1);
        let repetirPor = new Date(
          data.getFullYear(),
          data.getMonth() + operacao.repetirPor + 1,
          1
        );
        return (
          (operacao.fixa &&
            data.getTime() < new Date(ano, mes, 1).getTime() &&
            new Date(ano, mes, 1).getTime() <
              (operacao.repetirPor > 0 ? repetirPor.getTime() : 99999999999999999999999999999999) &&
            !operacao.excluirData.find((data) => {
              return (
                +data.toString().split('-')[1] === mes &&
                +data.toString().split('-')[0] === ano
              );
            })) ||
          (!operacao.fixa &&
            +operacao.data.split('-')[1] === mes &&
            +operacao.data.split('-')[0] === ano)
        );
      })
      .map((operacao) => {
        return {
          ...operacao,
          data: `${ano}-${mes}-${
            operacao.fixa ? '01' : operacao.data.split('-')[2]
          }`,
        };
      });
  }
}
