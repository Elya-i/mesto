// Popup редактирования профиля
const popupEditProfile = document.querySelector('.popup-edit-profile');
const profileForm = popupEditProfile.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input_profile_name');
const jobInput = profileForm.querySelector('.popup__input_profile_about');
const profileCloseButton = document.querySelector('.edit-profile-close-btn');
const profileSubmitButton = document.querySelector('.popup__submit-btn');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');
const profileEditButton = document.querySelector('.profile__edit-btn');


function openEditProfile() {
  popupEditProfile.classList.add('popup_opened');
  // При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями, которые отображаются на странице.
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent; 
}

function closeEditProfile() {
  popupEditProfile.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    // Получить значения полей jobInput и nameInput из свойства value
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value; 
    // Вставить новые значения с помощью textContent
    userName.textContent = nameInputValue;   
    userJob.textContent = jobInputValue;
    closeEditProfile();  
}

profileEditButton.addEventListener('click', openEditProfile);
profileCloseButton.addEventListener('click', closeEditProfile);
profileForm.addEventListener('submit', handleFormSubmit); 

// Открытие изображения карточки на весь экран
const popupOpenImage = document.querySelector('.popup_image');
const imageCloseButton = document.querySelector('.popup__close-btn');
const popupImagePhoto = document.querySelector('.popup__image-photo');
const popupImageCaption = document.querySelector('.popup__image-caption');

// Добавление исходных 6 карточек из коробки
const elementsContainer = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template').content;

const initialCards = [
  {name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
  {name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
  {name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
  {name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
  {name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
  {name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
]

initialCards.forEach((item) => {
  const initialCard = createCard(item);
  renderCard(initialCard, elementsContainer);
});

function openImage(event) {
  popupOpenImage.classList.add('popup_opened');
  popupImagePhoto.src = event.target.closest('.element__image').src;
  popupImageCaption.textContent = event.target.closest('.element').querySelector('.element__caption').textContent;
}

function closeImage() {
  popupOpenImage.classList.remove('popup_opened');
}

// Изменение состояния лайк после клика
function like(event) {
  event.target.classList.toggle('element__like-btn_active');
}

//Удаление карточки при клике на иконку 
function deleteCard(event) {
  event.target.closest('.element').remove();
}

function createCard(item) {
  const card = elementTemplate.cloneNode(true);
  card.querySelector('.element__name').textContent = item.name;
  card.querySelector('.element__image').src = item.link;
  card.querySelector('.element__like-btn').addEventListener('click', like);
  card.querySelector('.element__delete-btn').addEventListener('click', deleteCard);
  card.querySelector('.element__image').addEventListener('click', openImage);
  return card;
}

function renderCard(card, elementsContainer) {
  elementsContainer.append(card);
}

// Popup добавления новой карточки
const popupNewCard = document.querySelector('.popup-add-card');
const cardForm = popupNewCard.querySelector('.popup__form');
const newCardAddButton = document.querySelector('.profile__add-btn');
const newCardCloseButton = document.querySelector('.new-card-close-btn');
const newCardSubmitButton = document.querySelector('.popup__submit-btn');
const cardInputName = document.querySelector('.popup__input_image_name');
const cardInputLink = document.querySelector('.popup__input_image_link');

function editNewCard(event) {
  event.preventDefault();
  popupNewCard.classList.add('popup_opened');
}

function closeNewCardForm() {
  popupNewCard.classList.remove('popup_opened');
  cardInputName.value = '';
  cardInputLink.value = '';
}

function addNewCard(event) {
  event.preventDefault();
  const cardData = {name: cardInputName.value, link: cardInputLink.value};
  const newCard = createCard(cardData);
  elementsContainer.prepend(newCard);
  closeNewCardForm();
}

newCardAddButton.addEventListener('click', editNewCard);
newCardSubmitButton.addEventListener('click', addNewCard);
newCardCloseButton.addEventListener('click', closeNewCardForm);
cardForm.addEventListener('submit', addNewCard);