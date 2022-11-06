import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@finances-app/src/environments/environment';
import { EChartsOption } from 'echarts';
import { CurrencyPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class OperacoesService {
  constructor(private http: HttpClient, private currencyPipe: CurrencyPipe) {}

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

  configurarGraficoPorBanco(operacoes, tipoOperacao): EChartsOption {
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

        case 'BTG':
          color = '#010B25';
          break;

        case 'Unicred':
          color = '#044931';
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
        formatter: (params) => {
          return `<b>${params.name}</b> <br> <span style="color:${
            tipoOperacao === 'receita' ? 'green' : 'red'
          }">
<b>${this.currencyPipe.transform(params.value, 'BRL')}</b>  <br><i> ${
            params.percent
          }%</i>
</span>`;
        },
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

  configurarGraficoPorCategoria(operacoes, tipoOperacao): EChartsOption {
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
        text: 'Distribuição por Categoria',
      },
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          return `<b>${params.name}</b> <br> <span style="color:${
            tipoOperacao === 'receita' ? 'green' : 'red'
          }">
<b>${this.currencyPipe.transform(params.value, 'BRL')} <br> </b>  <i> ${
            params.percent
          }%</i>
</span>`;
        },
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

  configurarGraficoHome(meses, dadosDespesas, dadosReceitas): EChartsOption {
    dadosDespesas = dadosDespesas?.map((valor) => {
      return +valor?.toFixed(2);
    });
    dadosReceitas = dadosReceitas?.map((valor) => {
      return +valor?.toFixed(2);
    });
    return {
      backgroundColor: '#191919',
      title: {
        text: 'Receitas x Despesas dos últimos 6 meses',
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          return `<b>${
            params[0].name
          }</b> <br> Receita: <span style="color:green"><b>${this.currencyPipe.transform(
            params[0].value,
            'BRL'
          )}</span> </b> <br> Despesa: <span style="color:red"><b>${this.currencyPipe.transform(
            params[1].value,
            'BRL'
          )}</span></b><br>
            <span></span> Diferença: <span style="font-weight:bold;color:${
              params[0].value - params[1].value > 0 ? 'green' : 'red'
            }"> ${this.currencyPipe.transform(
            params[0].value - params[1].value,
            'BRL'
          )}
`;
        },
      },
      legend: {
        top: 30,
        data: ['Receita', 'Despesa'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {
            title: 'Exportar como imagem',
          },
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: meses,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Receita',
          type: 'line',
          emphasis: {
            focus: 'series',
          },
          data: dadosReceitas,
          color: 'rgb(53, 174, 150)',
        },
        {
          name: 'Despesa',
          type: 'line',
          emphasis: {
            focus: 'series',
          },
          data: dadosDespesas,
          color: 'rgb(255, 96, 79)',
        },
        {
          name: 'Saldo Previsto',
          type: 'line',
          emphasis: {
            focus: 'series',
          },
          data: dadosDespesas,
          color: 'rgb(255, 96, 79)',
        },
      ],
    };
  }

  configurarGraficoReceitaXDespesa(
    dadosReceita,
    dadosDespesa,
    dadosPrevisto,
    mes,
    ano
  ): EChartsOption {
    const meses = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
      'Janeiro',
    ];
    dadosDespesa.value = dadosDespesa?.value?.toFixed(2);
    dadosReceita.value = dadosReceita?.value?.toFixed(2);
    return {
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          return `${params.name}:<span style="color:${
            params.data.itemStyle.color
          }"> <b>${this.currencyPipe.transform(
            params.value,
            'BRL'
          )}</b><span> <br><i> ${params.percent}%</i> `;
        },
      },
      legend: {
        top: 80,
      },
      label: {
        formatter: (params) => {
          console.log(params);
          return `${params.name}`;
        },
      },
      toolbox: {
        feature: {
          saveAsImage: {
            title: 'Exportar como imagem',
          },
        },
      },
      backgroundColor: '#191919',
      title: {
        name: 'Teste',
        show: true,
        left: 'center',
        top: 0,
        text: `Receitas X Despesas \n \n${meses[mes - 1]} de ${ano}`,
      },
      series: [
        {
          type: 'pie',
          top: 90,
          data: [dadosReceita, dadosDespesa, dadosPrevisto],
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
