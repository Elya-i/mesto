const initialCards = [
  {name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', alt: 'Изображение гор покрытых зеленью и снегом'},
  {name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', alt: 'Изображение реки c заснеженными берегами'},
  {name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', alt: 'Изображение многоэтажных зданий в вечернее время'},
  {name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', alt: 'Изображение растительности на склоне вулкана Камчатки'},
  {name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', alt: 'Изображение железной дороги вдоль деревьев'},
  {name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', alt: 'Изображение зимнего скалистого берега озера Байкал'}
]

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

/** Popup редактирования профиля */
const profileEditButton = document.querySelector('.profile__edit-btn');

/** Добавление исходных 6 карточек из "коробки" */
const templateSelector = '#element-template';
const containerSelector = '.elements__list'; 

/** Popup добавления новой карточки */
const newCardAddButton = document.querySelector('.profile__add-btn');
const cardInputName = document.querySelector('.popup__input_image_name');
const cardInputLink = document.querySelector('.popup__input_image_link');

export { initialCards, validationConfig, profileEditButton, templateSelector, containerSelector, newCardAddButton };