'use strict';

const containerElement = document.querySelector('.container');
const allBooksInTheCart = document.getElementsByClassName('book');

const toCartBooks = JSON.parse(localStorage.getItem('toCartBooks')) || [];
console.log(toCartBooks);

const addCartWrapper = () => {
  containerElement.innerHTML = `
    <div class="cart_wrapper">
      <h2  id="cart_name" class="cart_name">Отличный выбор!</h1>
    </div>
  `;
};
addCartWrapper();

const addBook = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].quantity) {
      const heading = document.querySelector('h2');
      heading.insertAdjacentHTML(
        'afterend',
        `
          <div class="book">
            <img src="${arr[i].imageUrl}" alt="Книга">
            <div class="discription">
            <div class="book_information">
              <h4 class="book_name">${arr[i].title}
                <span class="book_year">(${arr[i].year})</span>
              </h4>
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
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </button>
            </div>
            </div>
          </div>
        `
      );
    }
  }
};
addBook(toCartBooks);

const getCartBookTotal = (collection) => {
  let result = 0;
  for (let elem of collection) {
    let bookPrice = elem.querySelector('.book_price span');
    let input = elem.querySelector('input');
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
        <a href="/index.html" class="back_to_catalog">В каталог</a>
        </div> 
      </div>
    `
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

const deleteBook = () => {
  for (let book of allBooksInTheCart) {
    let deleteBookButton = book.querySelector('.book_deleting');
    deleteBookButton.addEventListener('click', function (event) {
      book.remove();
      renderCartTotal();

      if (allBooksInTheCart.length <= 0) {
        const heading = document.querySelector('h1');
        heading.insertAdjacentHTML(
          'afterend',
          `
            <div class="empty_cart">
            Ваша корзина пуста
            </div>
          `
        );
      }
    });
  }
};
deleteBook();

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

const clearButton = document.querySelector('.clear');
const buyButton = document.querySelector('.buy_button');
const handlesEventsBuyButton = () => {
  buyButton.addEventListener('click', (event) => {
    if (getCartBookTotal(allBooksInTheCart) == 0) {
      buyButton.setAttribute('hidden', 'true');
      clearButton.setAttribute('hidden', 'true');
    } else {
      alert('Спасибо за покупку!');
    }
  });
};
handlesEventsBuyButton();

const clearCart = () => {
  clearButton.addEventListener('click', () => {
    for (let book of allBooksInTheCart) {
      book.remove();
      renderCartTotal();
      buyButton.setAttribute('hidden', 'true');
    }
    console.log(allBooksInTheCart);

    localStorage.clear();
  });
};
clearCart();
