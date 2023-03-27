function validateForm() {
	let valid = true;
	
	const name = document.getElementById("name");
	const surname = document.getElementById("surname");
	const deliveryDate = document.getElementById("deliveryDate");
	const street = document.getElementById("street");
	const houseNumber = document.getElementById("houseNumber");
	const flatNumber = document.getElementById("flatNumber");
	const form = document.querySelector('form');
	form.addEventListener('submit', (event) => {
		event.preventDefault();
	});
	if (name.value.length < 4 || !/^[a-zA-Z]+$/.test(name.value)) {
		name.classList.add("invalid");
		name.setCustomValidity('The field is invalid');
		// Call reportValidity() to display the validation message
		name.reportValidity();
		valid = false;
	} else {
		name.classList.remove("invalid");
		name.setCustomValidity('');
	}

		if (surname.value.length < 5 || !/^[a-zA-Z]+$/.test(surname.value)) {
			surname.classList.add("invalid");
			surname.setCustomValidity('The field is invalid');
			surname.reportValidity();
			valid = false;
		} else {
			surname.classList.remove("invalid");
			surname.setCustomValidity('');
		}
		
		const today = new Date();
		const deliveryDateValue = new Date(deliveryDate.value);
		if (deliveryDateValue <= today) {
			deliveryDate.classList.add("invalid");
			deliveryDate.setCustomValidity('The field is invalid');
			deliveryDate.reportValidity();
			valid = false;
		} else {
			deliveryDate.classList.remove("invalid");
			deliveryDate.setCustomValidity('');
		}
		
		if (street.value.length < 5 || !/^[a-zA-Z0-9\s]+$/.test(street.value)) {
			street.classList.add("invalid");
			street.setCustomValidity('The field is invalid');
			street.reportValidity();
			valid = false;
		} else {
			street.classList.remove("invalid");
			street.setCustomValidity('');
		}
		
		if (houseNumber.value < 1) {
			houseNumber.classList.add("invalid");
			houseNumber.setCustomValidity('The field is invalid');
			houseNumber.reportValidity();
			valid = false;
		} else {
			houseNumber.classList.remove("invalid");
			houseNumber.setCustomValidity('');
		}
		
		if (!/^[1-9]\d*(\-\d+)?$/.test(flatNumber.value)) {
			flatNumber.classList.add("invalid");
			flatNumber.setCustomValidity('The field is invalid');
			flatNumber.reportValidity();
			valid = false;
		} else {
			flatNumber.classList.remove("invalid");
			flatNumber.setCustomValidity('');
		}
		
		return valid;
		
	}
	
	function submitForm() {
		event.preventDefault();
		
		if (validateForm()) {
			const name = document.getElementById("name").value;
			const surname = document.getElementById("surname").value;
			const deliveryDate = document.getElementById("deliveryDate").value;
			const street = document.getElementById("street").value;
			const houseNumber = document.getElementById("houseNumber").value;
			const flatNumber = document.getElementById("flatNumber").value;
			const paymentType = document.querySelector('input[name="paymentType"]:checked').value;
			const gifts = [];
			const gift1 = document.getElementById("gift1");
			if (gift1.checked) {
				gifts.push(gift1.value);
			}
			const gift2 = document.getElementById("gift2");
			if (gift2.checked) {
				gifts.push(gift2.value);
			}
			const gift3 = document.getElementById("gift3");
			if (gift3.checked) {
				gifts.push(gift3.value);
			}
			const gift4 = document.getElementById("gift4");
			if (gift4.checked) {
				gifts.push(gift4.value);
			}
			
			const summary = `The order created. The delivery address is ${street} house ${houseNumber} flat ${flatNumber} in ${deliveryDate}. Payment ${paymentType}. Customer ${name} ${surname}.`;
			alert(summary);
		}
	}
	
	const completeButton = document.getElementById("completeButton");
	const formInputs = document.querySelectorAll("input:not([type=submit])");
	formInputs.forEach(input => {
		input.addEventListener("input", () => {
			if (validateForm()) {
				completeButton.disabled = false;
			} else {
				completeButton.disabled = true;
			}
		});
	});

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