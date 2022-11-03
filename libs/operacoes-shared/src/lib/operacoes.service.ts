import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@finances-app/src/environments/environment';
import { EChartsOption } from 'echarts';

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
              (operacao.repetirPor > 0 ? repetirPor.getTime() : 9e99) &&
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

  configurarGraficoPorBanco(operacoes): EChartsOption {
    let dataGrafico = operacoes?.map((operacao) => {
      let color = '';
      switch (operacao.conta.instituicao) {
        case 'Nubank':
          color = '#612F74';
          break;

        case 'Bradesco':
          color = '#dd042d';
          break;

        case 'Neon':
          color = '#26d3e0';
          break;

        case 'C6':
          color = '#242424';
          break;

        case 'Inter':
          color = '#FF7604';
          break;

        case 'Itau':
          color = '#004990';
          break;
      }
      return {
        itemStyle: {
          color: color,
        },
        name: operacao.conta.instituicao,
        value: operacoes
          .filter(
            (operacaoF) =>
              operacao.conta.instituicao === operacaoF.conta.instituicao
          )
          .reduce((total, operacaoV) => (total += operacaoV.valor), 0),
      };
    });

    return {
      backgroundColor: '#191919',
      legend: {
        top: 60,
        data: this.removeDuplicado(dataGrafico)?.map((r) => {
          return r.name;
        }),
      },
      title: {
        name: 'Teste 2',
        show: true,
        left: 'center',
        top: 0,
        text: 'Distribuição por Banco',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : R${c} <b>({d}%)</b>',
      },
      dataZoom: [
        {
          type: 'inside',
        },
      ],
      series: [
        {
          name: 'area',
          type: 'pie',
          top: 90,
          data: this.removeDuplicado(dataGrafico),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }

  configurarGraficoPorCategoria(operacoes): EChartsOption {
    let dataGrafico = operacoes?.map((operacao) => {
      return {
        name: operacao.categoria.descricao,
        value: operacoes
          .filter(
            (operacaoF) =>
              operacao.categoria.descricao === operacaoF.categoria.descricao
          )
          .reduce((total, operacaoV) => (total += operacaoV.valor), 0),
      };
    });

    return {
      backgroundColor: '#191919',
      legend: {
        top: 60,
        data: this.removeDuplicado(dataGrafico)?.map((r) => {
          return r.name;
        }),
      },
      title: {
        name: 'Teste',
        show: true,
        left: 'center',
        top: 0,
        text: 'Distribuição de Receitas',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : R${c} <b>({d}%)</b>',
      },
      dataZoom: [
        {
          type: 'inside',
        },
      ],
      series: [
        {
          name: 'area',
          type: 'pie',
          top: 90,
          data: this.removeDuplicado(dataGrafico),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }

  removeDuplicado(array) {
    return array?.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.name === value.name)
    );
  }
}
