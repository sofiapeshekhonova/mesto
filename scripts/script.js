
let openPopup = document.querySelector('.profile__information-button');
let closeButton = document.querySelector('.popup__icon');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__text_type_name');
let jobInput = document.querySelector('.form__text_type_job');
let saveButton = document.querySelector('.form__save');
let profileName = document.querySelector('.profile__information-name');
let profileJob = document.querySelector('.profile__information-job');

function showClick() {
  popup.classList.add('popup_opened');
  
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  // profileName.textContent = nameInput.value;
  // nameInput.textContent = profileName.value;
  // nameInput = profileName;
  // текуущие данные пользователя nameInput = form__text_type_name
  // в поля формы profileName = profile__information-name
  // nameInput = profileName;
  // jobInput = nameValue
}

function closeClick() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
// или так const formSubmitHandler = (event) => {
  evt.preventDefault(); 
  const nameValue = nameInput.value; 
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue; 
  closeClick();  
}

openPopup.addEventListener('click', showClick); 
closeButton.addEventListener('click', closeClick); 
formElement.addEventListener('submit', formSubmitHandler);