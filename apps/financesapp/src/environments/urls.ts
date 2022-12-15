export const API = (GATEWAY: string) => {
  const listaServicos = {
    conta: '/conta',
    despesa: '/despesa',
    receita: '/receita',
    auth: '/auth',
    user: '/user',
  };

  return {
    conta: {
      conta: `${GATEWAY}${listaServicos.conta}`,
    },
    despesa: {
      despesa: `${GATEWAY}${listaServicos.despesa}`,
    },
    receita: {
      receita: `${GATEWAY}${listaServicos.receita}`,
    },
    auth: {
      signin: `${GATEWAY}${listaServicos.auth}/local/signin`,
      signup: `${GATEWAY}${listaServicos.auth}/local/signup`,
    },
    user: {
      user: `${GATEWAY}${listaServicos.user}`,
    },
  };
};
