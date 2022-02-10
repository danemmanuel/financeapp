export const API = (GATEWAY: string) => {
  const listaServicos = {
    conta: '/conta',
    despesa: '/despesa',
    receita: '/receita',
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
  };
};