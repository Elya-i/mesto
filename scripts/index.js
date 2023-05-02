/** Объект валидации */
const validationConfig = {
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
}

/** Popup редактирования профиля */
const popupEditProfile = document.querySelector('.popup_type_profile');
const profileForm = popupEditProfile.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_profile_name');
const jobInput = profileForm.querySelector('.popup__input_profile_about');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const profileEditButton = document.querySelector('.profile__edit-btn');

/** Добавление исходных 6 карточек из "коробки" */
const elementTemplate = document.getElementById('element-template').content;
const elementsContainer = document.querySelector('.elements__list');

/** Открытие изображения карточки на весь экран */
const popupOpenImage = document.querySelector('.popup_type_image');
const popupImagePhoto = document.querySelector('.popup__image-photo');
const popupImageCaption = document.querySelector('.popup__image-caption');

/** Popup добавления новой карточки */
const popupNewCard = document.querySelector('.popup_type_card');
const newCardForm = popupNewCard.querySelector('.popup__form');
const newCardAddButton = document.querySelector('.profile__add-btn');
const cardInputName = document.querySelector('.popup__input_image_name');
const cardInputLink = document.querySelector('.popup__input_image_link');

/** Список всех кнопок закрытия Popup */
const popupCloseButtonList = document.querySelectorAll('.popup__close-btn'); 

/** Список всех Popup для закрытия кликом на Overlay и нажатием на Esc */
const popupCloseList = document.querySelectorAll('.popup');  

/** Функционал открытия/закрытия Popup */
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

/** Добавление обработчика события для закрытия всех Popup */
popupCloseButtonList.forEach((item) => {
  item.addEventListener('click', (event) => {
    const currentPopup = event.target.closest('.popup');
    closePopup(currentPopup);
  });
});

/** Добавление обработчика события для закрытия всех Popup при нажатии на Overlay */
popupCloseList.forEach((item) => {
  item.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(event.currentTarget);
    }
  })
});

/** Функция закрытия Popup нажатием на клавишу Esc */
const closePopupByEscape = (evt) => {
  if (evt.key === 'Escape'){
    popupCloseList.forEach((popup) => {
      closePopup(popup);
    })
  }
}

profileEditButton.addEventListener('click', () => {
  /** При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями, которые отображаются на странице. */
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent; 
  openPopup(popupEditProfile);
});

profileForm.addEventListener('submit', (event) => { 
    event.preventDefault(); 
    /** Получить значения полей jobInput и nameInput из свойства value */
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value; 
    /** Вставить новые значения с помощью textContent */
    userName.textContent = nameInputValue;   
    userJob.textContent = jobInputValue;
    closePopup(popupEditProfile);  
});

/** Создание карточки, like, удаление и открытие изображения в полноэкранном режиме */
const createCard = (item) => {
  const cardElement = elementTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__name');

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.alt;

  /** Функция открытия просмотра изображения карточки */
  cardImage.addEventListener('click', (event) => {
    popupImagePhoto.src = item.link;
    popupImagePhoto.alt = item.alt;
    popupImageCaption.textContent = item.name;
    openPopup(popupOpenImage);
});

  /** Изменение состояния like после клика */
  cardElement.querySelector('.element__like-btn').addEventListener('click', (event) => {
      event.target.classList.toggle('element__like-btn_active');
    });

  /** Удаление карточки при клике на иконку */
  cardElement.querySelector('.element__delete-btn').addEventListener('click', (event) => {
      event.target.closest('.element').remove();
    });
  
  return cardElement;
};

initialCards.forEach((item) => {
  const cardElement = createCard(item);
  elementsContainer.appendChild(cardElement);
});

/** Добавление новой карточки */
newCardAddButton.addEventListener('click', () => {
  cardInputName.value = '';
  cardInputLink.value = '';
  openPopup(popupNewCard);
  /** Функция деактивации кнопки Submit*/
  const disableSubmitButton = (validationConfig) => {
    const submitButton = document.querySelectorAll(validationConfig.submitButtonSelector);
    submitButton.forEach((buttonElement) => {
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
      buttonElement.disabled = true;
    });
  }
  disableSubmitButton(validationConfig);
});

newCardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const cardData = {name: cardInputName.value, link: cardInputLink.value};
  const cardElement = createCard(cardData);
  elementsContainer.prepend(cardElement);
  closePopup(popupNewCard);
});
