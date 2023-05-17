import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImagePhoto = this._popup.querySelector('.popup__image-photo');
    this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
  }

  open(name, image) {
    this._popupImageCaption.textContent = name;
    this._popupImagePhoto.src = image;
    this._popupImagePhoto.alt = name;
    super.open();
  }
}

export { PopupWithImage };