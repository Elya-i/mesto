import { Popup } from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__button-submit');
    this._submitButtonText = this._submitButton.textContent;
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleConfirmSubmit()
        .then((result) => this.close(result))
        .catch((error) => {
          console.log(error);
        })
    });
    super.setEventListeners();
  }

  handleConfirmSubmit(event) {
    this._handleConfirmSubmit = event;
  }

  showLoadingText() {
    this._submitButton.textContent = "Сохранение...";
  }

  hideLoadingText() {
    this._submitButton.textContent = this._submitButtonText;
  }
}
export { PopupWithConfirmation }; 