import { Popup } from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__button-submit');
    this._submitButtonText = this._submitButton.textContent;
  }

  handleConfirmSubmit(submitHandler) {
    this._handleConfirmSubmit = submitHandler;
  }

  renderLoading(isLoading, loadingText = 'Удаление...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleConfirmSubmit();
    });
  }
}
export { PopupWithConfirmation }; 