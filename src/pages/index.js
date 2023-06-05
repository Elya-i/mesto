import { validationConfig, profileEditButton, templateSelector, containerSelector, newCardAddButton, profileAvatarEditButton, apiConfig } from "../utils/data.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

import "./index.css"

const api = new Api(apiConfig);

let userId = null;

Promise.all([api.getUserData(), api.getCardList()])
  .then(([userData, cardList]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    section.renderItems(cardList);
  })
  .catch((error) => console.log(error))

/** Функция добавления на страницу исходных 6 карточек */
const section = new Section({
  renderer: (item) => {
    section.appendItem(createCard(item))
  }
}, containerSelector);

/** Создание карточки, like, удаление и открытие изображения в полноэкранном режиме */
const createCard = (data) => {
  const card = new Card(data, templateSelector, userId, handleOpenImage, handleLikeCard, handleDeleteCard);
  return card.generateCard();
};

const popupOpenImage = new PopupWithImage('.popup_type_image');
popupOpenImage.setEventListeners();

const handleOpenImage = (name, link) => {
  popupOpenImage.open(name, link);
}

const handleLikeCard = (card) => {
    if (card.isUserLike()) {
      api.dislikeCard(card.getCardId())
        .then((result) => card.updateLikeStatus(result.likes))
        .catch((error) => console.log(error));
    } else {
      api.likeCard(card.getCardId())
        .then((result) => card.updateLikeStatus(result.likes))
        .catch((error) => console.log(error));
    }
}

/** Popup подвтреждения удаления карточки */
const popupWithConfirmation = new PopupWithConfirmation('.popup_type_confirm');
popupWithConfirmation.setEventListeners()

const handleDeleteCard = (card) => {
  popupWithConfirmation.open();
  popupWithConfirmation.handleConfirmSubmit(() => {
    popupWithConfirmation.showLoadingText();
    api.deleteCard(card.getCardId())
      .then((result) => {
        popupWithConfirmation.close(result);
        card.deleteCard();
      })
      .catch((error) => console.log(error))
      .finally(() => popupWithConfirmation.hideLoadingText())
  })
}

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__job',
  userAvatarSelector: '.profile__avatar',
});

/** Popup редактирования профиля */
const popupEditProfile = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit: (data) => {
    popupEditProfile.showLoadingText();;
    api.sendUserData(data)
      .then((result) => {
        userInfo.setUserInfo(result);
        popupEditProfile.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        popupEditProfile.showLoadingText();
      })
  }
})
popupEditProfile.setEventListeners();

profileEditButton.addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
  formValidators['profileEditForm'].resetValidation();
});

/** Popup добавления новой карточки */
const popupNewCard = new PopupWithForm('.popup_type_card', { handleFormSubmit: (data) => {
  popupNewCard.showLoadingText();
  api.postNewCard({ name: data.imageName, link: data.imageLink })
   .then((result) => {
      section.prependItem(createCard(result));
      popupNewCard.close();
    })
    .catch((error) => console.log(error))
    .finally(() => popupNewCard.hideLoadingText());
  }
})
popupNewCard.setEventListeners();

newCardAddButton.addEventListener('click', () => {
  popupNewCard.open();
  formValidators['addImageForm'].resetValidation();
});

/** Popup обновления аватара пользователя */
const popupEditAvatar = new PopupWithForm('.popup_type_avatar', { handleFormSubmit: (data) => {
  popupEditAvatar.showLoadingText();
  api.updateUserAvatar(data)
    .then((result) => {
      userInfo.setUserInfo(result)
      popupEditAvatar.close();
    })
    .catch((error) => console.log(error))
    .finally(() => popupNewCard.hideLoadingText());
}
})
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
  });
}

enableValidation(validationConfig);