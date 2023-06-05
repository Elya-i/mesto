class Card {
  constructor(data, templateSelector, userId, handleOpenImage, handleLikeCard, handleDeleteCard) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardId = data._id;
    this._templateSelector = templateSelector;
    this._handleOpenImage = handleOpenImage;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteCard = handleDeleteCard;
      
    this._cardElement = this._getTemplate();
    this._cardName = this._cardElement.querySelector('.element__name');
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._cardLikeButton = this._cardElement.querySelector('.element__like-btn');
    this._cardLikeCounter = this._cardElement.querySelector('.element__like-counter');
    this._cardDeleteButton = this._cardElement.querySelector('.element__delete-btn');
  };

   
  /** Получение шаблона */
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  } 

  getCardId() {
    return this._cardId;
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  };

  setLike() {
    return this._likes.some((like) => like._id === this._userId)
  }

  updateLikeStatus(likes) {
    this._likes = likes;
    this._cardLikeCounter.textContent  = likes.length;
    this._cardLikeButton.classList.toggle('element__like-btn_active');
  }
  
  /** Обработчики событий */
  _setEventListeners() {
    this._cardLikeButton.addEventListener('click', () => this._handleLikeCard(this));
    this._cardDeleteButton.addEventListener('click', () => this._handleDeleteCard(this));
    this._cardImage.addEventListener('click', () => this._handleOpenImage(this._name, this._link)); 
  }

  generateCard() {
    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardLikeCounter.textContent = this._likes.length;

    if (this.setLike()) {
      this._cardLikeButton.classList.add('element__like-btn_active');
    }
    
    if (this._ownerId !== this._userId) {
      this._cardDeleteButton.classList.add('element__delete-btn_disable');;
    }

    this._setEventListeners();
    return this._cardElement;
  }
};
  
export { Card };