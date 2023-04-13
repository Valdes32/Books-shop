"use strict";

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
let yyyy = tomorrow.getFullYear();
let mm = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
let dd = tomorrow.getDate().toString().padStart(2, '0');
tomorrow = yyyy + '-' + mm + '-' + dd;
document.getElementById("deliveryDate").setAttribute("min", tomorrow);

let validation_input = document.querySelectorAll('.order-box input');

for (let i = 0; i < validation_input.length; i++) {
    validation_input[i].addEventListener('blur', function() {
        switch (this.type) {
            case 'text':
                validationTextInputs.call(this);
                break;
            case 'date':
                validationDateInputs.call(this);
                break;
            case 'number':
                validationNumberInputs.call(this);
                break;
        }
    });

    if (validation_input[i].name == 'flatNumber') {
        validation_input[i].addEventListener('input', function() {
            this.value = this.value.replace(/^-|^—|[^-—\d]/, '');
        });
    }
}

function validationTextInputs() {
    let error_message = this.parentNode.querySelector('.error-message');
    if (this.getAttribute('data-length') > this.value.length || 
        this.name == 'name' && (this.value.includes(' ') || /\d|\W/.test(this.value)) ||
        this.name == 'street' && /^-|^—|[^a-zA-Z0-9-\s]/.test(this.value) ||
        this.name == 'flatNumber' && (/^-|^—|[^-—\d]/.test(this.value) || this.value == '')) {
        this.classList.remove('valid');
        this.classList.add('invalid');
        error_message.style.display = 'block';
    } else {
        this.classList.remove('invalid');
        error_message.style.display = 'none';
        this.classList.add('valid');
    }
    enableSubmitButton();
}

function validationDateInputs() {
    let error_message = this.parentNode.querySelector('.error-message');
    if (this.value == '' || this.value < this.getAttribute('date')) {
        this.classList.remove('valid');
        this.classList.add('invalid');
        error_message.style.display = 'block';
    } else {
        this.classList.remove('invalid');
        this.classList.add('valid');
        error_message.style.display = 'none';
    }
    enableSubmitButton();
}

function validationNumberInputs() {
    let error_message = this.parentNode.querySelector('.error-message');
    if (this.value == '' || this.value < this.getAttribute('min')) {
        this.classList.remove('valid');
        this.classList.add('invalid');
        error_message.style.display = 'block';
    } else {
        this.classList.remove('invalid');
        this.classList.add('valid');
        error_message.style.display = 'none';
    }
    enableSubmitButton();
}

let completeButton = document.getElementById('completeButton');
function enableSubmitButton() {
    let validNumber = 6;
    for (let i = 0; i < validation_input.length; i++) {
        if (validation_input[i].classList.contains('valid')) {
            validNumber++;
        }
    }
    completeButton.disabled = (validNumber !== validation_input.length);
}

	function limitCheckBoxSelections() {
		var checkboxes = document.querySelectorAll('input[type="checkbox"]');
		var checkedCount = 0;
		for (var i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				checkedCount++;
			}
			if (checkedCount == 2) {
				for (var j = 0; j < checkboxes.length; j++) {
					if (!checkboxes[j].checked) {
						checkboxes[j].disabled = true;
					}
				}
				break;
			}
		}
		if (checkedCount < 2) {
			for (var j = 0; j < checkboxes.length; j++) {
				checkboxes[j].disabled = false;
			}
		}
	}

	const completeBtn = document.getElementById("completeButton");
	completeBtn.addEventListener("click", generateOrderMessage);
	
	function generateOrderMessage(event) {
		event.preventDefault(); // Prevent form submission
		const name = document.getElementById("name").value;
		const surname = document.getElementById("surname").value;
		const deliveryDate = document.getElementById("deliveryDate").value;
		const street = document.getElementById("street").value;
		const houseNumber = document.getElementById("houseNumber").value;
		const flatNumber = document.getElementById("flatNumber").value;
		const paymentType = document.querySelector('input[name="paymentType"]:checked').value;
		const gifts = [];
	
		const gift1 = document.getElementById("gift1");
		const gift2 = document.getElementById("gift2");
		const gift3 = document.getElementById("gift3");
		const gift4 = document.getElementById("gift4");
	
		if (gift1.checked) {
			gifts.push(gift1.value);
		}
		if (gift2.checked) {
			gifts.push(gift2.value);
		}
		if (gift3.checked) {
			gifts.push(gift3.value);
		}
		if (gift4.checked) {
			gifts.push(gift4.value);
		}
	
		const message = `Order details: <br>Name: ${name}<br>Surname: ${surname}<br><br>Delivery Date: ${deliveryDate}<br><br>Street: ${street}<br>House Number: ${houseNumber}<br>Flat Number: ${flatNumber}<br><br>Payment Type: ${paymentType}<br><br>Gifts: ${gifts.join(", ")}`;
	

    // Вставьте сообщение в элемент div с классом "order-box"
    const orderBox = document.querySelector(".order-box");
    orderBox.innerHTML = message;
  };

	/*Меню бургер*/
const iconMenu = document.querySelector('.menu__btn');
const logoMenu = document.querySelector('.header__logo');
const menuBody = document.querySelector('.menu__body');
const menuArea = document.querySelector('.menu__area');
if (iconMenu){
	iconMenu.addEventListener("click", function (e){
		document.body.classList.toggle('_lock')
		iconMenu.classList.toggle('active_icon');
		menuBody.classList.toggle('active_menu');
		logoMenu.classList.toggle('logo_active');
	});
}

const menu = document.querySelector('.menu__btn');
	document.addEventListener('click', (e) =>{
		const click = e.composedPath().includes(menu);
		if ( !click) {
			document.body.classList.remove('_lock')
			iconMenu.classList.remove('active_icon');
			menuBody.classList.remove('active_menu');
			logoMenu.classList.remove('logo_active');
		}
	})

	document.addEventListener('keydown', function(event) {
		if (event.key === "Enter") {
			event.preventDefault();
		}
	});