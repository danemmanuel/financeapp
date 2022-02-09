import { API } from './urls';
const GATEWAY = 'https://api.minhasfinancas.digital';

export const environment = {
  versao: '1.0',
  production: true,
  apis: {
    ...API(GATEWAY),
  },
};
