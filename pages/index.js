import { initialCards, validationConfig, profileEditButton, templateSelector, containerSelector,newCardAddButton, cardInputName, cardInputLink } from "../utils/data.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

/** Создание карточки, like, удаление и открытие изображения в полноэкранном режиме */
const createCard = (data) => {
  const card = new Card(data, templateSelector, handleCardClick);
  return card.generateCard();
};

const popupOpenImage = new PopupWithImage('.popup_type_image');
popupOpenImage.setEventListeners();

/** Функция открытия popup изображения при клике на карточку */
const handleCardClick = (name, link) => {
  popupOpenImage.open (name, link);
};

/** Функция добавления на страницу исходных 6 карточек */
const section = new Section({ 
  items: initialCards, renderer: (data) => {
    const card = new Card (data, templateSelector, handleCardClick);
    section.addItem(card.generateCard());
  }
}, containerSelector);
section.renderItems();

// Popup редактирования профиля
const userInfo = new UserInfo({ userNameSelector: '.profile__name', userJobSelector: '.profile__job'});

const popupEditProfile = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({ name: data.name, job: data.job });
    popupEditProfile.close();
  }
});
popupEditProfile.setEventListeners();

profileEditButton.addEventListener('click', () => {
  const userInfoInput = userInfo.getUserInfo();
  document.querySelector('#name-input').value = userInfoInput.name;
  document.querySelector('#job-input').value = userInfoInput.job;
  popupEditProfile.open();
  formValidators['profileEditForm'].resetValidation();
});

/** Popup добавления новой карточки */
const popupNewCard = new PopupWithForm('.popup_type_card', {handleFormSubmit: () => {
    section.addItem(createCard({ name: cardInputName.value, link: cardInputLink.value }, templateSelector, handleCardClick));
    popupNewCard.close();
  }
});
popupNewCard.setEventListeners();

newCardAddButton.addEventListener('click', () => {
  popupNewCard.open();
  formValidators['addImageForm'].resetValidation();
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