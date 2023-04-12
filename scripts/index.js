const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_profile_name');
const jobInput = formElement.querySelector('.popup__input_profile_about');
const popupCloseBtn = document.querySelector('.popup__close-btn');

const editButton = document.querySelector('.profile__edit-btn');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__job');

function openPopup() {
  popup.classList.add('popup_opened');
  // При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями, которые отображаются на странице.
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent; 
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    // Получить значения полей jobInput и nameInput из свойства value
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value; 
    
    // Вставить новые значения с помощью textContent
    userName.textContent = nameInputValue;   

    userJob.textContent = jobInputValue;

    closePopup();
  
}

editButton.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit); 

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    liked: false
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    liked: false
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    liked: false
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    liked: false
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    liked: false
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    liked: false
  }
];

const elementsList = document.querySelector('.elements__list');

function render(elements = [], parent) {
  clearTemplate(parent);

  const template = document.querySelector('#elements-template')

  elements.forEach(element => {
    const card = template.content.cloneNode(true);

    createImage(card, element);
    createCaption(card, element);
    createLike(card, element);

    parent.appendChild(card);
  });
}

function clearTemplate(parent) {
  while (parent.lastElementChild) {
    parent.removeChild(parent.lastElementChild)
  }
}

function createImage(parent, element) {
  const img = parent.querySelector('.element__image');
  img.src = element.link;
  img.alt = element.name;
}

function createCaption(parent, element) {
  const name = parent.querySelector('.element__name');
  name.textContent = element.name;
}

function createLike(parent, element) {
  const like = parent.querySelector('.element__like');

  if (element.liked) {
    like.classList.add('element__like_active');
  } else {
    like.classList.remove('element__like_active');
  }

  like.addEventListener('click', () => {
    element.liked = !element.liked;
    render(initialCards, elementsList);
  });
}

render(initialCards, elementsList);

