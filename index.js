import { books } from './books.js';
import { allBooksInTheCart, getCartBookTotal } from './cart.js';

const containerElement = document.querySelector('.container');

const cartTotal = getCartBookTotal(allBooksInTheCart);

const addVerticalManu = () => {
  containerElement.innerHTML = `
    <div class="vertical_menu">
      <button type="button" class="menu_button">
        <span>Книги</span>
      </button>
      <ul class="menu_list">
        <li><a href="" class="menu_link">Боевик, триллер</a></li>
        <li><a href="" class="menu_link">Детективы</a></li>
        <li><a href="" class="menu_link">Комиксы </a></li>
        <li><a href="" class="menu_link">Любовные романы </a></li>
        <li><a href="" class="menu_link">Приключения </a></li>
        <li><a href="" class="menu_link">Фантастика</a></li>
        <li><a href="" class="menu_link">Детская литература </a></li>
      </ul>
    </div>
  `;
};
addVerticalManu();

const addMainBlock = () => {
  const verticalMenu = document.querySelector('.vertical_menu');
  verticalMenu.insertAdjacentHTML(
    'afterend',
    `
      <div class="main_block">
        <div class="nav_block"></div>
        <div class="all_books"></div>
      </div>
    `
  );
};
addMainBlock();

const addInputGroup = () => {
  const navBlock = document.querySelector('.nav_block');
  navBlock.insertAdjacentHTML(
    'afterbegin',
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
  const inputGroup = document.querySelector('.input_group');
  inputGroup.insertAdjacentHTML(
    'afterend',
    `
      <div class='go_to_cart'>
        <i class="fas fa-shopping-cart"></i>
        <span>Всего:</span>
        <span>&#36 ${cartTotal}</span>
      </div>
    `
  );
};
addButtonGoToCart();

const addAllBooks = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const allBooks = document.querySelector('.all_books');
    allBooks.insertAdjacentHTML(
      'afterbegin',
      `
          <div class="book">
            <img src="${arr[i].imageUrl}" alt="Книга">
            <div class="book_information">
              <h3 class="book_name">${arr[i].title} (
                <span class="book_year">${arr[i].year}</span> )
              </h3>
              <p class="book_author">${arr[i].author}</p>
              <p class="book_price">&#36;<span>${arr[i].price.toFixed(
                2
              )}</span></p> 
            </div>
            <div class="book_quantity">
              <div class="book_counter">
                <input type="number" min="0" max="${arr[i].quantity}" value="${
        arr[i].quantity
      }">
              </div>
              <button class="book_deleting">
                <i class="fas fa-shopping-cart" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        `
    );
  }
};
addAllBooks(books);

const addSelectedBlock = () => {
  const navBlock = document.querySelector('.nav_block');
  navBlock.insertAdjacentHTML(
    'afterend',
    `
      <form>
        <label for="sorting_books">Сортировать книги:</label>
        <select id="sorting_books">
          <option value="">---</option>
          <option value="1">по алфавиту (A-Я)</option>
          <option value="2">по алфавиту (Я-А)</option>
          <option value="3">от дорогих к дешевым</option>
          <option value="4">от дешевых к дорогим</option>
        </select>
      </form>
    `
  );
};
addSelectedBlock();

const sortsBooks = (arr) => {
  let select = document.getElementById('sorting_books');
  console.log(select.value);
  select.addEventListener('change', (event) => {
    if (event.target.value == 1) {
      sortsByAlphabet(arr);
    }
    if (event.target.value == 2) {
      sortsByAlphabetReverse(arr);
    }
    if (event.target.value == 3) {
      sortsByPrice(arr);
    }

    if (event.target.value == 4) {
      sortsByPriceReverse(arr);
    }
  });
};
sortsBooks(books);

const sortsByAlphabet = (arr) => {
  let sortTitles = arr.sort((a, b) => (a.title < b.title ? 1 : -1));
  document.querySelector('.all_books').innerHTML = '';
  addAllBooks(sortTitles);
};

const sortsByAlphabetReverse = (arr) => {
  let sortTitlesReverse = arr
    .sort((a, b) => (a.title < b.title ? 1 : -1))
    .reverse();
  document.querySelector('.all_books').innerHTML = '';
  addAllBooks(sortTitlesReverse);
};

const sortsByPrice = (arr) => {
  let sortPrice = arr.sort((a, b) => (a.price > b.price ? 1 : -1));
  document.querySelector('.all_books').innerHTML = '';
  addAllBooks(sortPrice);
};

const sortsByPriceReverse = (arr) => {
  let sortPriceReverse = arr
    .sort((a, b) => (a.price > b.price ? 1 : -1))
    .reverse();
  document.querySelector('.all_books').innerHTML = '';
  addAllBooks(sortPriceReverse);
};
