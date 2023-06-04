import { Popup } from "./Popup.js"

class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
    this._submitButton = this._popup.querySelector('.popup__button-submit');
    this._submitButtonText = this._submitButton.textContent;
  }

  /** Метод сбора данных всех полей формы */ 
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(inputItem => {
      formValues[inputItem.name] = inputItem.value;
    });
    return formValues;
  }

  setInputValues = (data) => {
    this._inputList.forEach((inputItem) => {
      inputItem.value = data[inputItem.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  showLoadingText() {
    this._submitButton.textContent = "Сохранение...";
  }

  hideLoadingText() {
    this._submitButton.textContent = this._submitButtonText;
  }
}

export { PopupWithForm }