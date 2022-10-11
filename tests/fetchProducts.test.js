require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  test('Testando se é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  })

  test('Testando se o fetch foi chamado', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  test('Testando o retorno de fetch', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  })

  test('Testando o retorno da função', async () => {
    const chamada = await fetchProducts('computador');
    expect(chamada).toEqual(computadorSearch);
  })

  test('Testando o retorno da função sem argumentos', async () => {
    const chamada = await fetchProducts();
    expect(chamada).toEqual(new Error('You must provide an url'));
  })
});
