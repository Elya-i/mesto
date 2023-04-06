const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_name');
const jobInput = formElement.querySelector('.popup__input_job');
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