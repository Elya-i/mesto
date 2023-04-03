const popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__container');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');
const popupCloseBtn = formElement.querySelector('.popup__close-btn');


const user = document.querySelector('.profile__container');
const editButton = user.querySelector('.profile__edit-btn');
let userName = user.querySelector('.profile__name');
let userJob = user.querySelector('.profile__job');

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
    console.log(evt);   
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