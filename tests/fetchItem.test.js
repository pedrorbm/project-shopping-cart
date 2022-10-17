require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  test('Testando se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })

  test('Testando se fetch foi chamado', async () => {
    expect.assertions(1)
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  test('Testando se fetch retorna o endpoint correto', async () => {
    expect.assertions(1)
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  })

  test('Testando o retorno da função fetchItem', async () => {
    expect.assertions(1)
    const chamada = await fetchItem('MLB1615760527');
    expect(chamada).toEqual(item);
  })

  test('Testando o retorno da função fetchItem sem parâmetros', async () => {
    expect.assertions(1)
    const chamada = await fetchItem();
    expect(chamada).toEqual(new Error('You must provide an url'));
  })
});
