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
	burger();
	console.log(dataGlobal);

	// Get all the draggable items
	const draggables = document.querySelectorAll('.book');

	// Add event listeners for each draggable item
	draggables.forEach(draggable => {
		draggable.addEventListener('dragstart', () => {
			draggable.classList.add('dragging');
		});

		draggable.addEventListener('dragend', () => {
			draggable.classList.remove('dragging');
		});
	});

	// Get the dropzone
	const dropzone = document.querySelector('.cart_icon');

	// Add event listeners for the dropzone
	dropzone.addEventListener('dragover', event => {
		event.preventDefault();
		dropzone.classList.add('dragging-over');
	});

	dropzone.addEventListener('dragleave', event => {
		dropzone.classList.remove('dragging-over');
	});

	dropzone.addEventListener('drop', event => {
		event.preventDefault();
		dropzone.classList.remove('dragging-over');
		const draggable = document.querySelector('.dragging');
		if (draggable) {
			const title = draggable.querySelector('.title').textContent;
			const author = draggable.querySelector('.author').textContent;
			const price = draggable.querySelector('.price').textContent;
			addToCart({target: {dataset: {title, author, price}}});
			draggable.classList.remove('dragging');
		}
	});
})();

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






// box card

const Card = (item,index) => {
	const author = item.author;
	const imgPhoto = item.imageLink;
	const title = item.title
	const price = item.price

	return `<div class="book">
						<div class="ecover">
							<img src="../assets/image/${imgPhoto}" alt="cover">
						</div>
						<div class="book__right">
							<div class="book__info">
								<h2 class="price">${price} $</h2>
								<h3 class="title">${title}</h3>
								<h5 class="author">${author}</h5>
							</div>
							<div class="book__icons">
								<button class="buy-button" data-title="${title}" data-author="${author}" data-price="${price}" onclick="addToCart(event)">ADD TO CART</button>
								<button class="bth-show" onclick="openModal(event)" data-index="${index}"><img src="../assets/icon/dots-three-vertical-icon-original.svg" class="show-more" alt="more"></button>
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

function createPageHeader() {
  const headerFragment = document.createDocumentFragment();
  const header = document.createElement('header');
  header.className = 'header';
  
  const containerDiv = document.createElement('div');
  containerDiv.className = 'container';
  
  const headerContainerDiv = document.createElement('div');
  headerContainerDiv.className = 'header-container';
  
  const logoBoxDiv = document.createElement('div');
  logoBoxDiv.className = 'logo-box';
  
  const logoIconImg = document.createElement('img');
  logoIconImg.className = 'logo-icon';
  logoIconImg.src = '../assets/icon/logo.svg';
  
  const logoTextDiv = document.createElement('div');
  logoTextDiv.className = 'logo-text';
  
  const logoTitleH1 = document.createElement('h1');
  logoTitleH1.className = 'logo-title';
  logoTitleH1.textContent = 'Pages of Wisdom';
  
  const logoSuptitleP = document.createElement('p');
  logoSuptitleP.className = 'logo-suptitle';
  logoSuptitleP.textContent = 'books shop';
  
  const menuBtnDiv = document.createElement('div');
  menuBtnDiv.className = 'menu__btn';
  menuBtnDiv.setAttribute('for', 'menu__toggle');
  
  const span = document.createElement('span');
  
  const menuBodyNav = document.createElement('nav');
  menuBodyNav.className = 'menu__body';
  
  const menuListUl = document.createElement('ul');
  menuListUl.className = 'menu__list';
  
  const catalogLi = document.createElement('li');
  const catalogLink = document.createElement('a');
  catalogLink.className = 'menu__link active';
  catalogLink.href = '../pages/index.html';
  catalogLink.textContent = 'Catalog';
  catalogLi.appendChild(catalogLink);
  
  const deliveryLi = document.createElement('li');
  const deliveryLink = document.createElement('a');
  deliveryLink.className = 'menu__link';
  deliveryLink.href = '../pages/cart.html';
  deliveryLink.textContent = 'Delivery';
  deliveryLi.appendChild(deliveryLink);
  
  const cartLi = document.createElement('li');
  const cartButton = document.createElement('button');
  cartButton.className = 'cart_icon';
  cartButton.id = 'cart';
  cartButton.onclick = closeCart;
  
  const cartIconImg = document.createElement('img');
  cartIconImg.className = 'card-icon';
  cartIconImg.src = '../assets/icon/card.svg';
  
  const cartNumDiv = document.createElement('div');
  cartNumDiv.className = 'cart__num';
  cartNumDiv.id = 'cart_num';
  cartNumDiv.textContent = '0';
  
  cartButton.appendChild(cartIconImg);
  cartButton.appendChild(cartNumDiv);
  cartLi.appendChild(cartButton);
  
  menuListUl.appendChild(catalogLi);
  menuListUl.appendChild(deliveryLi);
  menuListUl.appendChild(cartLi);
  menuBodyNav.appendChild(menuListUl);
  
  logoTextDiv.appendChild(logoTitleH1);
  logoTextDiv.appendChild(logoSuptitleP);
  logoBoxDiv.appendChild(logoIconImg);
  logoBoxDiv.appendChild(logoTextDiv);
  headerContainerDiv.appendChild(logoBoxDiv);
  headerContainerDiv.appendChild(menuBtnDiv);
	menuBtnDiv.appendChild(span);
  headerContainerDiv.appendChild(menuBodyNav);
  containerDiv.appendChild(headerContainerDiv);
  header.appendChild(containerDiv);
  headerFragment.appendChild(header);
  
  wrapper.insertBefore(headerFragment, wrapper.firstChild);
}


//Create space for list books

function createPageBooks() {
  const fragment = document.createDocumentFragment();

  const div = document.createElement('div');
  div.className = 'card-page';
  div.innerHTML = `
    <div class="container">
      <div class="books-list">
      </div>
    </div>
  `;

  fragment.appendChild(div);

  wrapper.appendChild(fragment);
}

//create Footer

function createFooter() {
  const fragment = document.createDocumentFragment();

  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-box">
        <div class="logo-box">
          <img class="logo-icon fl" src="../assets/icon/logo.svg">
          <div class="logo-text">
            <h1 class="logo-title white">Pages of Wisdom</h1>
            <p class="logo-suptitle white">books shop</p>
          </div>
        </div>
        <div class="phone">
          <img class="phone-icon fl" src="../assets/icon/phone.svg">
          <a href="tel:+90506000000" class="phone-number white">+90506000000</a>
        </div>
      </div>
    </div>
  `;

  fragment.appendChild(footer);

  wrapper.appendChild(fragment);
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
											<button class="popup__close" onclick="closeModal()"><img class="button__close fl" src="../assets/icon/vector.svg"></button>
											<img class="popup-img" src="../assets/image/${imgPhoto}" alt="cover">
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
	document.body.classList.add('_lock');
}

function closeModal() {
const popup = document.querySelector('.popup__body');
	popup.innerHTML = '';
	document.querySelector('.popup').classList.remove('open');
	document.body.classList.remove('_lock');
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
/*Меню бургер*/

function burger() {
	const iconMenu = document.querySelector('.menu__btn');
	const menuBody = document.querySelector('.menu__body');
	if (iconMenu){
		iconMenu.addEventListener("click", function (e){
			document.body.classList.toggle('_lock')
			iconMenu.classList.toggle('active_icon');
			menuBody.classList.toggle('active_menu');
		});
	}
	
	const menu = document.querySelector('.menu__btn');
		document.addEventListener('click', (e) =>{
			const click = e.composedPath().includes(menu);
			if ( !click) {
				document.body.classList.remove('_lock')
				iconMenu.classList.remove('active_icon');
				menuBody.classList.remove('active_menu');
			}
		})
	}

function createPopup () {
	let div = document.createElement('div');
	div.className = "popup";
	div.innerHTML = `<a class="popup__area" onclick="closeModal()"></a>
										<div class="popup__body">`;
	wrapper.append(div);
}