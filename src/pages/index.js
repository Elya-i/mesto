import { initialCards, validationConfig, profileEditButton, templateSelector, containerSelector, newCardAddButton, profileAvatarEditButton, apiConfig } from "../utils/data.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

import "./index.css"

const api = new Api(apiConfig);

/** Отобразить карточки с сервера */
api.getInitialCards()
.then(data => {
  section.renderItems(data)
})

/** Создание карточки, like, удаление и открытие изображения в полноэкранном режиме */
const createCard = (data) => {
  const createCardElement = new Card(data, templateSelector, handleCardClick);
  return createCardElement.generateCard();
};

const popupOpenImage = new PopupWithImage('.popup_type_image');
popupOpenImage.setEventListeners();

/** Функция открытия popup изображения при клике на карточку */
const handleCardClick = (name, link) => {
  popupOpenImage.open (name, link);
};

/** Функция добавления на страницу исходных 6 карточек */
const section = new Section({ items: initialCards, renderer: (data) => {
    section.appendItem(createCard(data));
  }
}, containerSelector);
// section.renderItems();

/** Popup редактирования профиля */
const userInfo = new UserInfo({ 
  userNameSelector: '.profile__name', 
  userAboutSelector: '.profile__job',
  userAvatarSelector: '.profile__avatar',
});

const popupEditProfile = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({ name: data.name, about: data.about });
    popupEditProfile.close();
  }
});
popupEditProfile.setEventListeners();

profileEditButton.addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
  formValidators['profileEditForm'].resetValidation();
});

/** Popup добавления новой карточки */
const popupNewCard = new PopupWithForm('.popup_type_card', {handleFormSubmit: (formValues) => {
  section.prependItem(createCard({ name: formValues.imageName, link: formValues.imageLink}));
  popupNewCard.close();
  }
});
popupNewCard.setEventListeners();

newCardAddButton.addEventListener('click', () => {
  popupNewCard.open();
  formValidators['addImageForm'].resetValidation();
});

/** Popup обновления аватара пользователя */
const popupEditAvatar = new PopupWithForm('.popup_type_avatar', {
  handleFormSubmit: (data) => {
    userInfo.setUserAvatar(data);
  }
});
popupEditAvatar.setEventListeners();

profileAvatarEditButton.addEventListener('click', () => {
  popupEditAvatar.open();
  formValidators['updateAvatarForm'].resetValidation();
});

/** Валидация форм */
const formValidators = {};
const enableValidation = (data) => {
  const formList = Array.from(document.querySelectorAll(data.formSelector))
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(data, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  })
}

enableValidation(validationConfig);