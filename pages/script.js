let dataGlobal;
const wrapper = document.querySelector('.wrapper');

const getData = async () => {
	const response = await fetch("../assets/books.json");
	const data = await response.json();
	dataGlobal = data;
	return data;
};

(async () => {
	await getData();
	createPageHeader();
	createPageBooks();
	generateCard();
	createCart();
	createPopup();
	createFooter();
	console.log(dataGlobal);
})();



// box card

const Card = (item,index) => {
	const author = item.author;
	const imgPhoto = item.imageLink;
	const title = item.title
	const price = item.price

	return `<div class="book">
						<div class="ecover">
							<img src="/assets/image/${imgPhoto}" alt="cover">
						</div>
						<div class="book__right">
							<div class="book__info">
								<h2 class="price">${price} $</h2>
								<h3 class="title">${title}</h3>
								<h5 class="author">${author}</h5>
							</div>
							<div class="book__icons">
								<button class="buy-button" data-title="${title}" data-author="${author}" data-price="${price}" onclick="addToCart(event)">ADD TO CART</button>
								<button class="bth-show" onclick="openModal(event)" data-index="${index}"><img src="/assets/icon/dots-three-vertical-icon-original.svg" class="show-more" alt="more"></button>
								</div>
						</div>
					</div>`;
}

function generateCard () {
	const BooksItems = document.querySelector('.books-list');

	dataGlobal.forEach((item, index) => {
		const tempcard = Card(item, index);
		BooksItems.insertAdjacentHTML('beforeend', tempcard);
		});
};

//create Header

function createPageHeader () {
	let header = document.createElement('header');
	header.className = "header";
	header.innerHTML = `<div class="containet">
												<div class="header-container">
													<div class="logo-box">
														<img class="logo-icon" src="/assets/icon/logo.svg">
														<div class="logo-text">
															<h1 class="logo-title">Pages of Wisdom</h1>
															<p class="logo-suptitle">books shop</p>
														</div>
													</div>
													<div class="menu__btn" for="menu__toggle">	
														<span></span>
													</div>
													<nav class="menu__body">
														<ul class="menu__list">
															<li><a href="../pages/index.html" class="menu__link active">Catalog</a></li>
															<li><a href="../pages/cart.html" class="menu__link">Delivery</a></li>
															<li><button class="cart_icon" id="cart" onclick="closeCart();">
															<img class="card-icon" src="/assets/icon/card.svg">
															<div class="cart__num" id="cart_num" ;">0</div>
														</button></li>
														</ul>
													</nav>
												</div>
											</div>`;
	wrapper.prepend(header);
}

//Create space for list books

function createPageBooks () {
	let div = document.createElement('div');
	div.className = "card-page";
	div.innerHTML = `<div class="containet">
												<div class="books-list">
												</div>
											</div>`;
	wrapper.append(div);
}
function createPopup () {
	let div = document.createElement('div');
	div.className = "popup";
	div.innerHTML = `<a class="popup__area" onclick="closeModal()"></a>
										<div class="popup__body">`;
	wrapper.append(div);
}

//popup

function openModal(event) {
	const popup = document.querySelector('.popup__body');
	const { index } = event.currentTarget.dataset;
	const item = dataGlobal[index];
	const author = item.author;
	const imgPhoto = item.imageLink;
	const title = item.title;
	const price = item.price;
	const description = item.description;


	let tempcard = `
										<div class="popup__box">
											<button class="popup__close" onclick="closeModal()"><img class="button__close fl" src="/assets/icon/vector.svg"></button>
											<img class="popup-img" src="/assets/image/${imgPhoto}" alt="cover">
											<div class="book__info">
												<h3 class="popup-title">${title}</h3>
												<h5 class="popup-author">${author}</h5>
												<h3 class="popup-description">${description}</h3>
												<h2 class="popup-price">${price} $</h2>
											</div>
										</div>
	`;
	popup.insertAdjacentHTML('beforeend', tempcard);
	document.querySelector('.popup').classList.add('open');
	document.body.classList.add('lock');
}

function closeModal() {
const popup = document.querySelector('.popup__body');
	popup.innerHTML = '';
	document.querySelector('.popup').classList.remove('open');
	document.body.classList.remove('lock');
}
function createCart () {
  const div = document.createElement('div');
  div.className = "cart";
  div.innerHTML = `
    <h2>Shopping Cart</h2>
    <ul class="cart-items"></ul>
    <p>Total: <span class="cart-total">0.00</span> $</p>
    <button class="checkout-button"><a href="../pages/cart.html">Confirm Order</a></button>
  `;
  wrapper.append(div);
	let cartTotal = 0;
  const cartNumElement = document.querySelector('#cart_num');
  cartNumElement.textContent = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);

  const cartTotalElement = document.querySelector('.cart-total');
  cartTotalElement.textContent = cartTotal.toFixed(2);
}
//create Footer

function createFooter () {
	let footer = document.createElement('footer');
  footer.className = "footer";
	footer.innerHTML = `<div class="containet">
												<div class="footer-box">
													<div class="logo-box">
														<img class="logo-icon fl" src="/assets/icon/logo.svg">
														<div class="logo-text">
															<h1 class="logo-title white">Pages of Wisdom</h1>
															<p class="logo-suptitle white">books shop</p>
														</div>
												</div>
												<div class="phone">
													<img class="phone-icon fl" src="/assets/icon/phone.svg">
													<a href="tel:+90506000000" class="phone-number white">+90506000000</a>
												</div>
											</div>`;
	wrapper.append(footer);
}

//cart

const cart = {};

function addToCart(event) {
  const title = event.target.dataset.title;
  const author = event.target.dataset.author;
  const price = event.target.dataset.price;

  if (cart[title]) {
    cart[title].quantity += 1;
  } else {
    cart[title] = {
      author,
      price,
      quantity: 1,
    };
  }

  updateCart();
}

function updateCart() {
  const cartItemsList = document.querySelector('.cart-items');
  let cartTotal = 0;

  cartItemsList.innerHTML = '';

  for (const [title, item] of Object.entries(cart)) {
    const cartItem = document.createElement('li');
		cartItem.className = "item_li";
    cartItem.innerHTML = `
      <span class="cart-title">${title}</span>
      <span class="cart-quantity">${item.author}</span>
      <span class="cart-price">${item.price} $</span>
      <span class="cart-quantity">${item.quantity}</span>
    `;
    cartItemsList.appendChild(cartItem);

    const deleteButton = document.createElement('button');
		deleteButton.className = "btn_del";
    deleteButton.innerText = '×';
    deleteButton.addEventListener('click', () => {
      delete cart[title];
      updateCart();
    });
    cartItem.appendChild(deleteButton);

    cartTotal += item.quantity * parseFloat(item.price);
  }

  const cartTotalElement = document.querySelector('.cart-total');
  cartTotalElement.textContent = cartTotal.toFixed(2);

  const cartNumElement = document.querySelector('#cart_num');
  cartNumElement.textContent = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
}


	function closeCart() {
		const cart = document.querySelector('.cart');

		if (cart.classList.contains('open')) {
  cart.classList.remove('open');
		}
		else {document.querySelector('.cart').classList.add('open');}
	}
