export const API = (GATEWAY: string) => {
  const listaServicos = {
    conta: '/conta',
    despesa: '/despesa',
  };

  return {
    conta: {
      conta: `${GATEWAY}${listaServicos.conta}`,
    },
    despesa: {
      despesa: `${GATEWAY}${listaServicos.despesa}`,
    },
  };
};
