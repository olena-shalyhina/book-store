let books = [
  {
    title: '451° по Фаренгейту',
    year: 2008,
    author: 'Рэй Брэдбери',
    imageUrl: 'https://readrate.com/img/pictures/book/292/29286/29286/w240h400-cc0528ab.jpg',
    price: 12.5,
    quantity: 5,
  },
  {
    title: 'Маленький принц',
    year: 1948,
    author: 'Антуан де Сент-Экзюпери',
    imageUrl: 'https://readrate.com/img/pictures/book/293/29327/29327/w240h400-7e9028bd.jpg',
    price: 3.99,
    quantity: 3,
  },
  {
    title: 'Три товарища',
    year: 1967,
    author: 'Эрих Мария Ремарк',
    imageUrl: 'https://readrate.com/img/pictures/book/338/33800/33800/w240h400-0cdb782c.jpg',
    price: 9,
    quantity: 4,
  },
];


const bodyElement = document.body;
const allBook = document.getElementsByClassName('book');


const addCartWrapper = () => {
  bodyElement.innerHTML = `
    <div class="cart_wrapper">
      <h1 class="cart_name">Корзина</h1>
    </div>
  `;
}
addCartWrapper();

const addbook = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (books[i].quantity) {
      const heading = document.querySelector('h1');
      heading.insertAdjacentHTML(
        'afterend', `
        <div class="book">
          <img src="${books[i].imageUrl}">
          <div class="book_information">
            <h3 class="book_name">${books[i].title} (
              <span class="book_year">${books[i].year}</span> )
            </h3>
            <p class="book_author">${books[i].author}</p>
            <p class="book_price">&#36;<span>${books[i].price.toFixed(2)}</span></p> 
          </div>
          <div class="book_quantity">
            <form class="book_counter">
              <input type="number" min="1" max="${books[i].quantity}" value="${books[i].quantity}">
            </form>
            <button class="book_deleting">
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </button>
          </div>
        </div>`
      );
    }
  }
}
addbook(books);



function cartBookTotal(collection) {
  let result = 0;
  console.log(result);
  for (elem of collection) {
    let bookPrice = elem.querySelector('.book_price span');
    console.log(bookPrice.innerHTML);
    let input = elem.querySelector('input');
    result = result + (+(bookPrice.innerHTML) * (+(input.value)));
    console.log(input.value)
  } return result
}
const cartTotal = cartBookTotal(allBook);


const addCartTotal = () => {
  const cartWrapper = document.querySelector('.cart_wrapper');
  cartWrapper.insertAdjacentHTML(
    'beforeend',
    `<div class="cart_total">
      <p class="book_price">Всего: &#36;
        <span class="total_price">${cartTotal.toFixed(2)}</span>
      </p>
      <button class="buy_button">Купить</button> 
    </div>`
  )
}
addCartTotal();


const bookDeleting = () => {
  for (let elem of allBook) {
    let deleteBookButton = elem.querySelector('.book_deleting');
    deleteBookButton.addEventListener("click", function (event) {
      //let input = elem.querySelector('input');
      // if (input.value > 0) {
      //   input.value -= 1;
      // }
      // if (input.value <= 0) {
      //   elem.remove();
      // }
      elem.remove();    
      if (allBook.length <= 0) {
        const heading = document.querySelector('h1');
        heading.insertAdjacentHTML(
          'afterend', `
          <div class="empty_cart">
          Ваша корзина пуста
          </div>`
        );
      }
    })
  }
}
bookDeleting();


const cartTotalRender = () => {
  let cartTotal = cartBookTotal(allBook);
  let totalPrice = document.querySelector('.total_price');
  totalPrice.innerHTML = `${cartTotal.toFixed(2)}`;
  console.log((`${cartTotal.toFixed(2)}`))
};


for (elem of allBook) {
  let deleteBookButton = elem.querySelector('.book_deleting');
  deleteBookButton.onclick = function () {
    cartTotalRender();
  }

};
for (elem of allBook) {
  let cartInput = elem.querySelector('input');
  cartInput.addEventListener('change', function (event) {
    if (event.target.closest('[value]')) {
      cartTotalRender();
    }
  })
}


const cartBuyButtonThanks = document.querySelector('.buy_button');
cartBuyButtonThanks.addEventListener('click', function (event) {
  alert("Спасибо за покупку!");
  })


