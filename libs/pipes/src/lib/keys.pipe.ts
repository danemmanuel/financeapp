import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'errorKeys',
})
export class ErrorKeysPipe implements PipeTransform {
  patterns = {
    '/^[a-zA-Z ]*$/': 'Esse campo aceita apenas letras sem acento.',
    // tslint:disable-next-line: max-line-length
    '/^[A-Za-z\xe1\xe2\xe0\xe2\xe3\xe9\xe8\xea\xea\xed\xef\xee\xf3\xf4\xf4\xf5\xf6\xfa\xfb\xe7\xf1\xc1\xc2\xc0\xc2\xc3\xc9\xca\xc8\xcd\xcf\xce\xd3\xd4\xd4\xd5\xd6\xda\xc7\xd1 ]+$/':
      'Esse campo aceita apenas letras',
    // tslint:disable-next-line: max-line-length
    '/^[a-zA-Z0-9-z\xe1\xe2\xe0\xe2\xe3\xe9\xe8\xea\xea\xed\xef\xee\xf3\xf4\xf4\xf5\xf6\xfa\xfb\xe7\xf1\xc1\xc2\xc0\xc2\xc3\xc9\xca\xc8\xcd\xcf\xce\xd3\xd4\xd4\xd5\xd6\xda\xc7\xd1 ]*$/':
      'Esse campo aceita apenas letras e números.',
    '/[d]$/': 'Esse campo aceita apenas números.',
    '/[a-zA-Z]{3}[0-9]{1}(?![a-jA-J]{2})([0-9a-jA-J]{1})[0-9]{2}/i':
      'Placa inválida',
    '/[a-zA-Z0-9-&. ]/': 'Nome inválido',
  };

  transform(value?: any, args?: any): any {
    if (!value) {
      return value;
    }

    const errorKeys = Object.keys(value).sort((a, b) => {
      if (b === 'required') {
        return -1;
      }
      return 0;
    });

    const foundError = this.getError(value, errorKeys[0], args);
    return foundError;
  }

  getError(value: any, key: any, args: any): any {
    switch (key) {
      case 'required':
        return 'Campo obrigatório.';

      case 'pattern':
        return `Conteúdo do campo inválido`;

      case 'minlength':
        return `mínimo de ${value[key].requiredLength} caracteres.`;

      case 'maxlength':
        return `${value[key].actualLength} caracteres digitados,
          apenas ${value[key].requiredLength} são permitidos.`;

      case 'apenasNumeros':
        return 'Insira apenas caracteres números';

      case 'alfaNumerico':
        return 'Insira apenas caracteres alfa-numéricos';

      case 'max':
        return `Valor máximo ${value[key].max}`;

      case 'min':
        return `Valor mínimo ${value[key].min}`;

      case 'ciaNaoEncontrada':
        return `Nenhuma CIA encontrada`;

        case 'corretagemNaoEncontrada':
        return `Nenhuma Corretagem encontrada`;

      case 'filialNaoEncontrada':
        return `Nenhuma Filial encontrada`;

      case 'ramoNaoEncontrado':
        return `Nenhum ramo encontrado`;

      case 'docNaoEncontrado':
        return `Documento não encontrado`;

      case 'documentoInvalido':
        return 'Documento inválido';

      case 'matDatepickerMax':
        return `Data máxima ${moment(value.matDatepickerMax.max).format(
          'DD/MM/YYYY'
        )}`;

      case 'matDatepickerParse':
        return `Data inválida`;
    }
  }

  verificaTipoDeDataInvalida(value: any) {
    if (value['matDatepickerParse']) {
      const momentDate = moment(value['matDatepickerParse'].text, 'DD/MM/YYYY');
      const minDate1901 = moment('01/01/1901', 'DD/MM/YYYY');

      if (momentDate.isBefore(minDate1901)) {
        return 'Data mínima 01/01/1901';
      }
    }
    return 'Data inválida';
  }
}
