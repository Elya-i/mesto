const parameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage; 
  errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = ''; 
}

function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, button, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  }
}

function enableValidation(parameters) {
  const formList = Array.from(document.querySelectorAll(parameters.formSelector));
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));
    const buttonElement = formElement.querySelector(parameters.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, parameters.inputErrorClass, parameters.errorClass);
        toggleButtonState(inputList, buttonElement, parameters.inactiveButtonClass);
      });
    });
  });
}

enableValidation(parameters);