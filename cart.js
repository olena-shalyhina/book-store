'use strict';

const containerElement = document.querySelector('.container');
const allBooksInTheCart = document.getElementsByClassName('book');
let toCartBooks = JSON.parse(localStorage.getItem('toCartBooks')) || [];
console.log(toCartBooks);

const addCartWrapper = () => {
  containerElement.innerHTML = `
  <div class="cart_wrapper">
  <h2  id="cart_name" class="cart_name">Отличный выбор!</h2>
  <div class="books_container"></div>
  </div>
  `;
};
addCartWrapper();

const booksContainer = document.querySelector('.books_container');
const addBook = (arr) => {
  booksContainer.innerHTML = '';
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].quantity) {
      const bookElement = document.createElement('div');
      bookElement.className = 'book';
      bookElement.innerHTML = `
            <img src="${arr[i].imageUrl}" alt="Книга">
            <div class="discription">
            <div class="book_information">
              <h4 class="book_name">${arr[i].title}</h4>
              <span class="book_year">(${arr[i].year})</span>
              <p class="book_author">${arr[i].author}</p>
              <p class="book_price">&#36;<span>${arr[i].price.toFixed(
                2,
              )}</span></p>
            </div>
            <div class="book_quantity">
              <div class="book_counter">
                <input type="number" min="1" max="${arr[i].quantity}" value="${
        arr[i].quantity
      }">
              </div>
              <button class="book_deleting">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </button>
            </div>
            </div>
          </div>
        `;
      booksContainer.append(bookElement);
    }
  }
};
addBook(toCartBooks);

const getCartBookTotal = (books) => {
  let result = 0;
  for (let book of books) {
    let bookPrice = book.querySelector('.book_price span');
    let input = book.querySelector('input');
    result = result + +bookPrice.innerHTML * +input.value;
  }
  return result;
};

const addCartTotal = () => {
  const cartTotal = getCartBookTotal(allBooksInTheCart).toFixed(2);
  const cartWrapper = document.querySelector('.cart_wrapper');
  cartWrapper.insertAdjacentHTML(
    'beforeend',
    `
      <div class="cart_total">
        <p class="book_price">Всего: &#36;
          <span class="total_price">${cartTotal}</span>
        </p>
        <div class="total_buttons">
        <button class="buy_button" >Купить</button> 
        <button class="clear">Очистить
        </button> 
        <a href="/book-store/index.html" class="back_to_catalog">В каталог</a>
        </div> 
      </div>
    `,
  );
};
addCartTotal();

const renderCartTotal = () => {
  let cartTotal = getCartBookTotal(allBooksInTheCart);
  let totalPrice = document.querySelector('.total_price');
  totalPrice.innerHTML = `${cartTotal.toFixed(2)}`;
  localStorage.cartTotal = JSON.stringify(cartTotal.toFixed(2));
  console.log(cartTotal);
};
renderCartTotal();
const clearButton = document.querySelector('.clear');
const buyButton = document.querySelector('.buy_button');

const updatetoCartBooks = (book) => {
  const bookName = book.querySelector('.book_name');
  toCartBooks = toCartBooks.filter(
    (book) => !book.title.includes(bookName.innerText),
  );
  localStorage.setItem('toCartBooks', JSON.stringify(toCartBooks));
};

const cartWarning = () => {
  const heading = document.querySelector('h2');
  heading.innerHTML = '';
  booksContainer.innerHTML = `
        <div class="empty_cart">
        Ваша корзина пуста
        </div>
      `;
  buyButton.setAttribute('hidden', 'true');
  clearButton.setAttribute('hidden', 'true');
  renderCartTotal();
  localStorage.clear();
};

const deleteBook = (books) => {
  for (let book of books) {
    const deleteBookButton = book.querySelector('.book_deleting');
    deleteBookButton.addEventListener('click', function (event) {
      book.remove();
      updatetoCartBooks(book);
      renderCartTotal();
      if (books.length === 0) {
        cartWarning();
      }
    });
  }
};
deleteBook(allBooksInTheCart);

// const updateQuontity = (book) => {
//   let input = book.querySelector('input');
//   book.quantity = input.value;
// };

const validateBookQuantity = () => {
  const inputs = document.querySelectorAll('input');
  Array.from(inputs).forEach((input) => {
    const min = +input.min;
    const max = +input.max;

    input.addEventListener('blur', (event) => {
      const value = +event.target.value;
      if (Math.floor(value) != value) {
        input.value = Math.floor(input.value);
      }
      if (value > max) {
        input.value = max;
      }
      if (value < min) {
        input.value = min;
      }
      renderCartTotal();
    });

    input.addEventListener('change', function (event) {
      if (event.target.closest('[value]')) {
        renderCartTotal();
      }
    });
  });
};
validateBookQuantity();

const handlesEventsTotalButtons = () => {
  buyButton.addEventListener('click', (event) => {
    alert('Спасибо за покупку!');
  });
};
handlesEventsTotalButtons();

const clearCart = () => {
  clearButton.addEventListener('click', () => {
    cartWarning();
    renderCartTotal();
  });
};
clearCart();
