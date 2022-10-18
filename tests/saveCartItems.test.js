const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  test('Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado', () => {
    expect(saveCartItems('cartItem')).localStorageSimulator('setItem')
  })

  test(`Teste se, ao executar saveCartItems com um cartItem como argumento, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro a chave 'cartItems' e o segundo sendo o valor passado como argumento para saveCartItems`, () => {
    expect(saveCartItems('cartItem')).localStorageSimulator('setItem').toEqual({cartItem: ['ID: MLB1937076326 | TITLE: Pc Computador Cpu Core I5 650 + Ssd 240gb, 8gb Memória Ram | PRICE: $1062.5']});
  })
});
