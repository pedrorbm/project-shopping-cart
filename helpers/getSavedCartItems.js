const getSavedCartItems = () => {
  const get = localStorage.getItem('cartItens');
  return JSON.parse(get);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
