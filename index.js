// import { books, allBooks, getCartBookTotal } from './cart.js';
// console.log(getCartBookTotal(allBooks));
// console.log(books);
const containerElement = document.querySelector('.container');
const addManu = () => {
  containerElement.innerHTML = `
  <div class="menu">
    <button type="button" class="menu_button">
      <span>Книги</span>
    </button>
    <ul class="menu_list">
      <li><a href="" class="menu_link">Детективы</a></li>
      <li><a href="" class="menu_link">Фантастика</a></li>
      <li><a href="" class="menu_link">Боевик, триллер</a></li>
      <li><a href="" class="menu_link">Романы</a></li>
    </ul>
  </div>
  `;
};
addManu();

const addInputGroup = () => {
  const menu = document.querySelector('.menu');
  menu.insertAdjacentHTML(
    'afterend',
    `
      <div class="input_group">
        <input type="text" name="search" placeholder="Поиск книги по названию">
        <button type="button" class="button_search">
        <i class="fas fa-search"></i>
        </button> 
      </div>
    `
  );
};
addInputGroup();
console.log(containerElement);

const addButtonGoToCart = () => {
  const buttonGoToCart = document.querySelector('.input_group');
  buttonGoToCart.insertAdjacentHTML(
    'afterend',
    `
      <div class='go_to_cart'>
        <i class="fas fa-shopping-cart"></i>
        <span>ТОВАРОВ:</span>
        <span>0</span>
        <span>(&#36 0,00)</span>
      </div>
    `
  );
};
addButtonGoToCart();
