import { API } from './urls';
const GATEWAY = 'https://financess-back.herokuapp.com';

export const environment = {
  versao: '1.0',
  production: true,
  apis: {
    ...API(GATEWAY),
  },
};
