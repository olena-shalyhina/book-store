import { books } from './books.js';
import { allBooksInTheCart, getCartBookTotal } from './cart.js';

const containerElement = document.querySelector('.container');

const cartTotal = getCartBookTotal(allBooksInTheCart);

const addVerticalManu = () => {
  containerElement.innerHTML = `
    <div class="vertical_menu">
      <button type="button" class="vertical_menu_button">
        <span>Книги</span>
      </button>
      <div class="filters">
        <fieldset>
          <legend>Жанр</legend>
          <div>
            <input type="checkbox" id="novels" name="genre" value="novels">
            <label for="novels">Романы</label>
          </div>
          <div>
            <input type="checkbox" id="fiction" name="genre" value="fiction">
            <label for="fiction">Фантастика</label>
          </div>
          <div>
            <input type="checkbox" id="fairy_tales" name="genre" value="fairy_tales">
            <label for="fairy_tales">Сказки</label>
          </div>
        </fieldset>
        <fieldset>
          <legend>Цена</legend>
          <div>
            <label for="min_price">От</label>
            <input id="min_price"  class="price" type="number" min="0" max="" value="">
          </div>
          <div>
            <label for="max_price">До</label>
            <input id="max_price" class="price" type="number" min="0" max="" value="">
          </div>
        </fieldset>
        <div>
          <button type="button" class="vertical_menu_button
           apply">
            <span>Применить</span>
          </button>
        </div>
      </div>
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
        <input type="text" name="search_by_name" placeholder="Поиск книги по названию">
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
        <span>&#36 ${cartTotal.toFixed(2)}</span>
      </div>
    `
  );
};
addButtonGoToCart();

const addAllBooks = (arr) => {
  const allBooks = document.querySelector('.all_books');
  allBooks.innerHTML = '';
  for (let i = 0; i < arr.length; i++) {
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

//Сортировка

const addSelectedBlock = () => {
  const navBlock = document.querySelector('.nav_block');
  navBlock.insertAdjacentHTML(
    'afterend',
    `
      <form class="sorting">
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

//ФИЛЬТРЫ

//поиск по названию книги
const searchByName = (arr) => {
  const inputSearch = document.querySelector('[name="search_by_name"]');

  const buttonSearsh = document.querySelector('.button_search');
  buttonSearsh.addEventListener('click', (event) => {
    const filterByName = arr.filter((item) =>
      item.title.toUpperCase().includes(inputSearch.value.toUpperCase())
    );
    // document.querySelector('.all_books').innerHTML = '';
    addAllBooks(filterByName);
  });
};
searchByName(books);

//по жанру
/*
const filtersBooksByGenre = (books) => {
  const checkboxes = Array.from(document.querySelectorAll('[name="genre"]'));
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const checkedCheckboxes = checkboxes.filter((item) => item.checked);
      if (checkedCheckboxes.length === 0) {
        addAllBooks(books);
        return;
      }
      let filteredBooks = [];
      for (let checkbox of checkedCheckboxes) {
        // filteredBooks = filteredBooks.concat(
        //   books.filter((book) => book.genre === checkbox.value)
        // );
        const newBooks = books.filter((book) => book.genre === checkbox.value);
        filteredBooks = [...filteredBooks, ...newBooks];
      }
      addAllBooks(filteredBooks);
    });
  });
};
filtersBooksByGenre(books);
*/
const filtersBooksByGenre1 = (books) => {
  const checkboxes = Array.from(document.querySelectorAll('[name="genre"]'));
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const genres = checkboxes
        .filter((item) => item.checked)
        .map((item) => item.value);

      if (genres.length === 0) {
        addAllBooks(books);
        return;
      }
      const filteredBooks = books.filter((book) => genres.includes(book.genre));
      addAllBooks(filteredBooks);
    });
  });
};
filtersBooksByGenre1(books);

//по цене

const priceInputs = document.getElementsByClassName('price');
const validateNumberInputValue = () => {
  console.log(priceInputs);
  Array.from(priceInputs).forEach((input) => {
    input.addEventListener('blur', (event) => {
      const min = +input.min;
      const value = +event.target.value;
      // let minValue = parseFloat(priceInputs[0].value);
      // let maxValue = parseFloat(priceInputs[1].value);
      if (value < min) {
        input.value = min;
      }
      if (value > min) {
        input.value = value.toFixed(2);
      }
      // if (maxValue < minValue) {
      //   input.value = minValue.toFixed(2);добавить span cо свойством hidden (или display-block или display-none)
      // }
    });
  });
};
validateNumberInputValue();

const getBooksByPrice = (arr) => {
  const applyButton = document.querySelector('.apply');
  console.log(applyButton);
  applyButton.addEventListener('click', (event) => {
    const minValue = parseFloat(priceInputs[0].value);
    const maxValue = parseFloat(priceInputs[1].value);
    const booksByPrice = arr.filter(
      (item) => item.price >= minValue && item.price <= maxValue
    );
    if (booksByPrice.length > 0) {
      // document.querySelector('.all_books').innerHTML = '';
      addAllBooks(booksByPrice);
    } else {
      // document.querySelector('.all_books').innerHTML = '';
      addAllBooks(books);
    }
  });
};
getBooksByPrice(books);

/*фильтры:
1 По жанрам чекбокс 
- изначально не выбран не один(все книги)
- реализовать возможность выбора нескольких кнопок, с отрисовкой соответствующего контента;

2 Цена 
два маленьких намберовых импута от-до включительно
значение инпутов  - мин 0 мах не ограничена
валидация вводить только цифры округлить до 2 знаков
мин не может быть больше макс, но могут быть равны

3 поиск : при вводе произвольных символов в любом кол-ва,  после нажатия на кнопку показывать книги в названии которых  содержаться набранная строка.*/
