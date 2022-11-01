import { API } from './urls';
const GATEWAY = 'http://localhost:3000';

export const environment = {
  versao: '1.0',
  production: false,
  apis: {
    ...API(GATEWAY),
  },
};
