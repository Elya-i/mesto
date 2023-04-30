class Card {
  constructor(data, templateSelector, openImage) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._templateSelector = templateSelector;
    this._openImage = openImage;
  };

  /** Получение шаблона */
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  } 

  /** Изменение состояния like после клика */
  _like(evt) {
    evt.target.classList.toggle('element__like-btn_active');
  };
  
  /** Удаление карточки при клике на иконку */
  _delete() {
    this._cardElement.remove();
  };
  
  /** Обработчики событий */
  _setEventListeners() {
    this._cardElementLike.addEventListener('click', this._like);
    this._cardElementDelete.addEventListener('click', () => this._delete());
    this._cardElementImage.addEventListener('click', () => this._openImage({name: this._name, link: this._link, alt: this._alt}));
  };

  _openImage() {
    popupImageCaption.textContent = this._name;
    popupImagePhoto.src = this._link;
    popupImagePhoto.alt = this._alt;
    
    openPopup(popupOpenImage);
  };
  
  generateCard() {

    /** Поиск карточки и ее элементов */
    this._cardElement = this._getTemplate();
    this._cardElementTitle = this._cardElement.querySelector('.element__name');
    this._cardElementImage = this._cardElement.querySelector('.element__image');
    this._cardElementLike = this._cardElement.querySelector('.element__like-btn');
    this._cardElementDelete = this._cardElement.querySelector('.element__delete-btn');


    this._cardElementTitle.textContent = this._name;
    this._cardElementImage.src = this._link;
    this._cardElementImage.alt = this._alt;
    
    this._setEventListeners();

    return this._cardElement;
  }
  
};
  
export { Card };