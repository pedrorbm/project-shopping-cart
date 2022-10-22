const saveCartItems = (items) => {
  const save = localStorage.setItem('cartItens', JSON.stringify(items));
  return save;
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
