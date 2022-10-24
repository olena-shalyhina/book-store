let books = [
  {
    title: '451° по Фаренгейту',
    year: 2008,
    author: 'Рэй Брэдбери',
    imageUrl:
      'https://readrate.com/img/pictures/book/292/29286/29286/w240h400-cc0528ab.jpg',
    price: 12.5,
    quantity: 5,
  },
  {
    title: 'Маленький принц',
    year: 1948,
    author: 'Антуан де Сент-Экзюпери',
    imageUrl:
      'https://readrate.com/img/pictures/book/293/29327/29327/w240h400-7e9028bd.jpg',
    price: 3.99,
    quantity: 3,
  },
  {
    title: 'Три товарища',
    year: 1967,
    author: 'Эрих Мария Ремарк',
    imageUrl:
      'https://readrate.com/img/pictures/book/338/33800/33800/w240h400-0cdb782c.jpg',
    price: 9,
    quantity: 4,
  },
];

//заменить на div body
const bodyElement = document.body;
const allBooks = document.getElementsByClassName('book');

const addCartWrapper = () => {
  bodyElement.innerHTML = `
    <div class="cart_wrapper">
      <h1 class="cart_name">Корзина</h1>
    </div>
  `;
};
addCartWrapper();
const addBook = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (books[i].quantity) {
      const heading = document.querySelector('h1');
      heading.insertAdjacentHTML(
        'afterend',
        `
          <div class="book">
            <img src="${books[i].imageUrl}">
            <div class="book_information">
              <h3 class="book_name">${books[i].title} (
                <span class="book_year">${books[i].year}</span> )
              </h3>
              <p class="book_author">${books[i].author}</p>
              <p class="book_price">&#36;<span>${books[i].price.toFixed(
                2
              )}</span></p> 
            </div>
            <div class="book_quantity">
              <div class="book_counter">
                <input type="number" min="0" max="${
                  books[i].quantity
                }" value="${books[i].quantity}">
              </div>
              <button class="book_deleting">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        `
      );
    }
  }
};
addBook(books);

const getCartBookTotal = (collection) => {
  let result = 0;
  for (elem of collection) {
    let bookPrice = elem.querySelector('.book_price span');
    let input = elem.querySelector('input');
    result = result + +bookPrice.innerHTML * +input.value;
  }
  return result;
};

const addCartTotal = () => {
  const cartTotal = getCartBookTotal(allBooks).toFixed(2);
  const cartWrapper = document.querySelector('.cart_wrapper');
  cartWrapper.insertAdjacentHTML(
    'beforeend',
    `<div class="cart_total">
      <p class="book_price">Всего: &#36;
        <span class="total_price">${cartTotal}</span>
      </p>
      <button class="buy_button">Купить</button> 
    </div>`
  );
};
addCartTotal();

const deleteBook = () => {
  for (let elem of allBooks) {
    let deleteBookButton = elem.querySelector('.book_deleting');
    deleteBookButton.addEventListener('click', function (event) {
      elem.remove();
      if (allBooks.length <= 0) {
        const heading = document.querySelector('h1');
        heading.insertAdjacentHTML(
          'afterend',
          `
          <div class="empty_cart">
          Ваша корзина пуста
          </div>`
        );
      }
    });
  }
};
deleteBook();
//каждый обработчик в отдельную функцию
//добавить функцию которая будет запускать цикл с функциями-обработчиками
const validateBookQuantity = () => {
  const inputs = document.querySelectorAll('input');
  Array.from(inputs).forEach((input) => {
    const min = +input.min;
    const max = +input.max;

    input.addEventListener('focus', (event) => {
      const value = +event.target.value;
      //можно вынести в отдельную функцию:
      if (value > max) {
        input.value = max;
      } else if (value < min) {
        input.value = min;
      }
    });

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
    });
  });
};
validateBookQuantity();

const renderCartTotal = () => {
  let cartTotal = getCartBookTotal(allBooks);
  let totalPrice = document.querySelector('.total_price');
  totalPrice.innerHTML = `${cartTotal.toFixed(2)}`;
};

for (elem of allBooks) {
  let deleteBookButton = elem.querySelector('.book_deleting');
  deleteBookButton.onclick = function () {
    renderCartTotal();
  };
}
for (elem of allBooks) {
  let cartInput = elem.querySelector('input');
  cartInput.addEventListener('change', function (event) {
    if (event.target.closest('[value]')) {
      renderCartTotal();
    }
  });
}

const cartBuyButton = document.querySelector('.buy_button');
cartBuyButton.addEventListener('click', function (event) {
  alert('Спасибо за покупку!');
});
