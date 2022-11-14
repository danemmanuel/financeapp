import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@finances-app/src/environments/environment';
import { EChartsOption } from 'echarts';
import { CurrencyPipe } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContasService } from '@finances-app-libs/conta-shared/src/lib/contas.service';

@Injectable({
  providedIn: 'root',
})
export class OperacoesService {
  private despesas = new BehaviorSubject<any>(undefined);
  private receitas = new BehaviorSubject<any>(undefined);

  constructor(
    private http: HttpClient,
    private currencyPipe: CurrencyPipe,
    private _contaService: ContasService
  ) {}

  setDespesa(user: any): void {
    this.despesas.next(user);
  }

  getDespesas(): Observable<any> {
    return this.despesas.asObservable();
  }

  setReceita(user: any): void {
    this.receitas.next(user);
  }

  getReceitas(): Observable<any> {
    return this.receitas.asObservable();
  }

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

  async consolidarCarteira() {
    const despesas = await this.buscarDespesas({}).toPromise();
    this.setDespesa(despesas);

    const receitas = await this.buscarReceitas({}).toPromise();
    this.setReceita(receitas);

    const contas = await this._contaService.buscarContas().toPromise();
    this._contaService.setConta(contas);
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

        case 'Rico':
          color = '#F24E00';
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
        data: this.removeDuplicado(dataGrafico, 'name')?.map((r) => {
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
          data: this.removeDuplicado(dataGrafico, 'name'),
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
        data: this.removeDuplicado(dataGrafico, 'name')?.map((r) => {
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
          data: this.removeDuplicado(dataGrafico, 'name'),
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
        text: 'Receitas x Despesas',
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
        text: `${meses[mes - 1]} de ${ano} \n \n Saldo Previsto: ${
          !dadosPrevisto
            ? 'calculando...'
            : this.currencyPipe.transform(dadosPrevisto, 'BRL')
        }`,
      },
      series: [
        {
          type: 'pie',
          top: 90,
          data: [dadosReceita, dadosDespesa],
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

  removeDuplicado(array, atributo) {
    return array?.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t[atributo] === value[atributo])
    );
  }
}
