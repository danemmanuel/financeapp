import { API } from './urls';
const GATEWAY = 'http://34.238.156.113';

export const environment = {
  versao: '1.0',
  production: true,
  apis: {
    ...API(GATEWAY),
  },
};
