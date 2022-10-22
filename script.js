// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 
// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const products = async () => {
  const object = await fetchProducts('computador');
  const items = document.querySelector('.items');
  const product = object.results;
  product.map((element) => {
    const { id, title, thumbnail } = element;
    const addProdutos = items.appendChild(createProductItemElement({ id, title, thumbnail }));
    return addProdutos;
  });
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('.item_id').innerText;

const idItem = async (id) => {
  const searchId = await fetchItem(id);
  return searchId;
};

const cartItemClickListener = (event) => {
  const cartItem = event.target;
  const removeItemCart = cartItem.remove();
  return removeItemCart;
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const ol = document.querySelector('.cart__items');
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return ol.appendChild(li);
};

const eventClick = () => {
  const button = document.querySelectorAll('.item__add');
  button.forEach((element) => element.addEventListener('click', async (event) => {
    const buttonBuy = event.target;
    const section = buttonBuy.parentNode;
    const getId = getIdFromProductItem(section);
    const productId = await idItem(getId);
    const { id, title, price } = productId;
    return createCartItemElement({ id, title, price });
  }));
};

const save = () => {
  const button = document.querySelectorAll('.item__add');
  const array = [];
  button.forEach((element) => element.addEventListener('click', async (event) => {
    const buttonBuy = event.target;
    const section = buttonBuy.parentNode;
    const getId = getIdFromProductItem(section);
    const productId = await idItem(getId);
    const { id, title, price } = productId;
    array.push({ idd: `${id}`, titlee: `${title}`, pricee: `${price}` });
    return saveCartItems(array);
  }));
};

const removeCart = (event) => {
  const cartItem = event.target;
  cartItem.remove();
};

const removeLocal = (event) => {
  const local = event.target;
  const localText = local.innerText;
  let string = 'M';
  for (let index = 5; index < 17; index += 1) {
    const element = localText[index];
    string += element;
  }
  const getItem = getSavedCartItems();
  const fil = getItem.filter((element) => element.idd !== string);
  saveCartItems(fil);
};

const get = () => {
  const ol = document.querySelector('.cart__items');
  const getItem = getSavedCartItems();
  if (getItem === null || getItem === undefined) {
    console.log('nada');
  } else if (getItem !== null || getItem !== undefined) {
    getItem.forEach((element) => {
      const { idd, titlee, pricee } = element;
      const li = document.createElement('li');
      li.className = 'cart__item';
      li.innerText = `ID: ${idd} | TITLE: ${titlee} | PRICE: $${pricee}`;
      li.addEventListener('click', removeCart);
      li.addEventListener('click', removeLocal);
      return ol.appendChild(li);
    });
  }
};

const removeCartAll = () => {
  const itemCart = document.querySelectorAll('.cart__item');
  const buttonCart = document.querySelector('.empty-cart');
  buttonCart.addEventListener('click', () => {
    itemCart.forEach((element) => element.remove());
    localStorage.clear();
  });
};

window.onload = async () => { 
  await products();
  eventClick();
  save(); 
  get();
  removeCartAll();
};
