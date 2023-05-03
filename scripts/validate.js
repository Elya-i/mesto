const parameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

 const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage; 
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => { 
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = ''; 
}

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, inactiveButtonClass);
  } else {
    enableSubmitButton(buttonElement, inactiveButtonClass);
  }
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = ({formSelector, inputErrorClass, errorClass}) => {
  const getFormList = Array.from(document.querySelectorAll(formSelector));
  getFormList.forEach((formElement) => {
    setEventListeners(formElement, inputErrorClass, errorClass);
  })
};

enableValidation(parameters);