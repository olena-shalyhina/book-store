import { books } from './books.js';

const containerElement = document.querySelector('.container');
// const cartTotal = getCartBookTotal(allBooksInTheCart);
let cartTotal = JSON.parse(localStorage.getItem('cartTotal')) || '0.00';
console.log(localStorage.cartTotal);

const booksPrice = books.map((book) => book.price);
const getMaxPrice = (books) => {
  const maxPrice = Math.max(...booksPrice).toFixed(2);
  return maxPrice;
};
const maxPrice = getMaxPrice(books);
const getMinPrice = (books) => {
  const minPrice = Math.min(...booksPrice).toFixed(2);
  return minPrice;
};
const minPrice = getMinPrice(books);

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
            <input id="min_price"  class="price" type="number" min="${minPrice}" max="${maxPrice}" step="0.01" value="" placeholder="${minPrice}">
          </div>
          <div>
            <label for="max_price">До</label>
            <input id="max_price" class="price" type="number" min="${minPrice}" max="${maxPrice}" step="0.01" value="" placeholder="${maxPrice}">
            <p class="warning">Некорректный диапазон поиска</p>
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
        <input type="text" name="search_by_name" placeholder="Поиск по названию">
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
      <a href="/cart.html" target="_blank">
        <i class="fas fa-shopping-cart"></i>
        <span>Всего:</span>
        <span class="buy_total">&#36 ${cartTotal}</span>
      </a>
      </div>
    `
  );
};
addButtonGoToCart();

const addBook = (book, bookContainer) => {
  const bookElement = document.createElement('div');
  bookElement.className = 'book';
  bookElement.innerHTML = `
    <img src="${book.imageUrl}" alt="Книга">
    <div class="book_information">
      <h3 class="book_name">${book.title}<br> 
        <span class="book_year">(${book.year})</span> 
      </h3>
      <p class="book_author">${book.author}</p>
      <p class="book_price">&#36;<span>${book.price.toFixed(2)}</span></p> 
    </div>
    <div class="book_quantity">
      <div class="book_counter">
        <input type="number" min="0" max="${book.quantity}" value="${
    book.quantity
  }">
      </div>
      <button class="add_cart book_deleting">
        <i class="fas fa-shopping-cart" aria-hidden="true"></i>
      </button>
    </div>`;

  buyBook(book, bookElement);
  bookContainer.append(bookElement);
};

const addedToCartBooks = [];

const booksTotal = (books) => {
  cartTotal = books
    .map((book) => book.price * book.quantity)
    .reduce((accumulator, price) => accumulator + price, 0);
  console.log(cartTotal);
  const span = document.querySelector('.buy_total');
  span.innerHTML = `&#36 ${cartTotal.toFixed(2)}`;
};

const buyBook = (book, bookElement) => {
  const bookCounter = bookElement.querySelector('.book_counter input');
  const bookButton = bookElement.querySelector('.add_cart');
  bookButton.addEventListener('click', () => {
    console.log(book);
    console.log(bookCounter.value);
    book.quantity = bookCounter.value;
    addedToCartBooks.push(book);
    cartTotal = booksTotal(addedToCartBooks);

    localStorage.toCartBooks = JSON.stringify(addedToCartBooks);
  });
};

const addAllBooks = (arr) => {
  const allBooks = document.querySelector('.all_books');
  allBooks.innerHTML = '';
  for (let i = 0; i < arr.length; i++) {
    addBook(arr[i], allBooks);
  }
};
addAllBooks(books);

//Добавление товаров в корзину

//СОРТИРОВКА

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
    if (event.target.value === '1') {
      sortByAlphabetAscending(arr);
    }
    if (event.target.value === '2') {
      sortByAlphabetDescending(arr);
    }
    if (event.target.value === '3') {
      sortByPriceDescending(arr);
    }
    if (event.target.value === '4') {
      sortByPriceAscending(arr);
    }
  });
};
sortsBooks(books);

const sortByAlphabetAscending = (arr) => {
  let sortTitles = arr.sort((a, b) => (a.title > b.title ? 1 : -1));
  addAllBooks(sortTitles);
};

const sortByAlphabetDescending = (arr) => {
  let sortTitlesReverse = arr.sort((a, b) => (a.title < b.title ? 1 : -1));
  addAllBooks(sortTitlesReverse);
};

const sortByPriceDescending = (arr) => {
  let sortPrice = arr.sort((a, b) => (a.price < b.price ? 1 : -1));
  addAllBooks(sortPrice);
};

const sortByPriceAscending = (arr) => {
  let sortPriceReverse = arr.sort((a, b) => (a.price > b.price ? 1 : -1));
  addAllBooks(sortPriceReverse);
};

//ФИЛЬТРЫ

//Фильтр по названию книги
const searchByName = (books) => {
  const inputSearch = document.querySelector('[name="search_by_name"]');

  const buttonSearsh = document.querySelector('.button_search');
  buttonSearsh.addEventListener('click', (event) => {
    const filterByName = books.filter((book) =>
      book.title.toUpperCase().includes(inputSearch.value.toUpperCase())
    );
    addAllBooks(filterByName);
  });
};
searchByName(books);

//Фильтр по жанру
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
/*ОК КОД
const filtersBooksByGenre = (books) => {
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
filtersBooksByGenre(books);
*/

const filtersBooksByGenre = (books) => {
  const checkboxes = Array.from(document.querySelectorAll('[name="genre"]'));
  const genres = checkboxes
    .filter((item) => item.checked)
    .map((item) => item.value);
  const filteredBooks = books.filter((book) => genres.includes(book.genre));
  return filteredBooks;
};

//Фильтр по цене

const priceInputs = document.getElementsByClassName('price');
const validateNumberInputValue = () => {
  Array.from(priceInputs).forEach((input) => {
    input.addEventListener('blur', (event) => {
      // const min = +input.min;
      const value = +event.target.value;
      const minValue = parseFloat(priceInputs[0].value);
      const maxValue = parseFloat(priceInputs[1].value);
      const warning = document.querySelector('.warning');
      if (value < minPrice) {
        input.value = minPrice;
      }
      if (value > minPrice) {
        input.value = value.toFixed(2);
      }
      if (maxValue < minValue || maxValue > maxPrice) {
        warning.style.display = 'block';
      } else {
        warning.style.display = 'none';
      }
    });
  });
};
validateNumberInputValue();

/*
const getBooksByPrice = (books) => {
  const applyButton = document.querySelector('.apply');
  console.log(applyButton);
  applyButton.addEventListener('click', (event) => {
    const minValue = parseFloat(priceInputs[0].value);
    const maxValue = parseFloat(priceInputs[1].value);
    const booksByPrice = books.filter(
      (item) => item.price >= minValue && item.price <= maxValue
    );
    if (booksByPrice.length > 0) {
      addAllBooks(booksByPrice);
    } else {
      addAllBooks(books);
    }
  });
};
getBooksByPrice(books);

*/
//Попытка объединить

const filtersBooks = (books) => {
  const applyButton = document.querySelector('.apply');
  applyButton.addEventListener('click', function (event) {
    const booksByGenre = filtersBooksByGenre(books);
    console.log(booksByGenre);

    const minValue = parseFloat(priceInputs[0].value);
    const maxValue = parseFloat(priceInputs[1].value);
    let booksByPrice = booksByGenre.filter(
      (book) => book.price >= minValue && book.price <= maxValue
    );
    // addAllBooks(booksByPrice);

    // if (booksByGenre.length === 0) {
    //   booksByPrice = books.filter(
    //     (book) => book.price >= minValue && book.price <= maxValue
    //   );
    //   addAllBooks(booksByPrice);
    // }
    // if (booksByGenre.length > 0) {
    //   addAllBooks(booksByGenre);
    // }

    // if (booksByGenre.length > 0) {
    //   if (booksByPrice.length > 0) {
    //     addAllBooks(booksByPrice);
    //   }
    //   if (booksByPrice.length === 0) {
    //     addAllBooks(booksByGenre);
    //   }
    // }
    // if (booksByPrice.length > 0) {
    //   if (booksByGenre.length === 0) {
    //     booksByPrice = books.filter(
    //       (book) => book.price >= minValue && book.price <= maxValue
    //     );
    //     addAllBooks(booksByPrice);
    //   }
    //   if (booksByGenre.length > 0) {
    //     booksByPrice = booksByGenre.filter(
    //       (book) => book.price >= minValue && book.price <= maxValue
    //     );
    //     addAllBooks(booksByPrice);
    //   }
    // }
    // if (booksByPrice.length === 0) {
    //   if (booksByGenre.length > 0) {
    //     addAllBooks(booksByGenre);
    //   }
    //   if (booksByGenre.length === 0) {
    //     addAllBooks(books);
    //   }
    // }
    console.log(booksByGenre);
    console.log(booksByGenre.length);
    console.log(booksByPrice);
    console.log(booksByPrice.length);

    if (booksByGenre.length > 0 && booksByPrice.length === 0) {
      console.log(booksByPrice.length);
      console.log(booksByGenre.length);
      addAllBooks(booksByGenre);
    }
    if (booksByGenre.length === 0) {
      booksByPrice = books.filter(
        (book) => book.price >= minValue && book.price <= maxValue
      );
      console.log(booksByPrice.length);
      console.log(booksByGenre.length);
      addAllBooks(booksByPrice);
    }

    if (booksByPrice.length > 0 && booksByGenre.length > 0) {
      console.log(booksByPrice.length);
      console.log(booksByGenre.length);
      addAllBooks(booksByPrice);
    }
    if (booksByGenre.length === 0 && booksByPrice.length === 0) {
      addAllBooks(books);
      console.log(booksByPrice.length);
      console.log(booksByGenre.length);
    }
  });
};
filtersBooks(books);

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
