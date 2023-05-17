import { Popup } from "./Popup.js"

class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.popup__form')
  }

  /** Метод сбора данные всех полей формы */ 
  _getInputValues() {
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
    this._formValues = {};
    this._inputList.forEach(inputItem => {
      this._formValues[inputItem.name] = inputItem.value;
    });
    return this._formValues;
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
}

export { PopupWithForm }