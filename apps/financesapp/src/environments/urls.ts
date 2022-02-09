export const API = (GATEWAY: string) => {
  const listaServicos = {
    conta: '/conta',
  };

  return {
    conta: {
      conta: `${GATEWAY}${listaServicos.conta}`,
    },
  };
};
