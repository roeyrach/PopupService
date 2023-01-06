function createFormService(formParentElement, onSubmit) {
	const formElement = document.querySelector(formParentElement)
	const inputElements = formElement.querySelectorAll("input")

	function isEmail(emailAdress) {
		let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

		if (emailAdress.match(regex)) return true
		else return false
	}

	function isNumber(arg) {
		const num = parseInt(arg)
		if (typeof num === "number") {
			return "number"
		} else {
			return "no"
		}
	}

	function validation() {
		let isValid = true
		inputElements.forEach((ie) => {
			const inputType = ie.getAttribute("id")

			const inputValue = ie.value
			isNumber(inputValue)
			const errorElement = ie.nextElementSibling

			if (
				(inputType === "firstName" || inputType === "lastName") &&
				inputValue.length < 2
			) {
				isValid = false
				errorElement.textContent = "Input must be at least 2 characters long"
				errorElement.style.color = "red"
			} else if (inputType === "number" && !isNumber(inputValue) === "number") {
				isValid = false
				errorElement.textContent = "Input must be a number"
				errorElement.style.color = "red"
			} else if (inputType === "email" && !isEmail(inputValue)) {
				isValid = false
				errorElement.textContent = "Input must be a valid email address"
				errorElement.style.color = "red"
			} else {
				errorElement.textContent = ""
			}
		})
		return isValid
	}

	function onResetForm() {
		formElement.reset()
		inputElements.forEach((ie) => {
			const errorElement = inputElement.nextElementSibling
			errorElement.textContent = ""
		})
	}

	function onSubmitForm(event) {
		if (event !== null) {
			event.preventDefault()
			if (validation) {
				onSubmit()
			}
		}
	}

	formElement.addEventListener("submit", onSubmitForm)
	formElement.addEventListener("reset", onResetForm)

	return {
		onSubmit: onSubmitForm,
		isValid: validation,
		onResetForm: onResetForm,
	}
}

const form = createFormService("form", () => {
	// This function will be called when the form is submitted and all input validations pass
	console.log("Form submitted")
})
const button = document.getElementById("submit-button")

button.addEventListener("click", () => {
	if (form.isValid()) {
		form.onSubmit()
	}
})
