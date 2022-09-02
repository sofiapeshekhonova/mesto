
let openPopup = document.querySelector('.profile__information-button');
let closeButton = document.querySelector('.popup__icon');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__text_type_name');
let jobInput = document.querySelector('.form__text_type_job');
let saveButton = document.querySelector('.form__save');
let profilename = document.querySelector('.profile__information-name');
let profilejob = document.querySelector('.profile__information-job');

function showClick() {
  popup.classList.add('popup_opened');
}

function closeClick() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
// или так const formSubmitHandler = (event) => {
  evt.preventDefault(); 
  const name = nameInput.value;
  const job = jobInput.value;
  profilename.textContent = name;
  profilejob.textContent = job; 
  closeClick();  

}
openPopup.addEventListener('click', showClick); 
closeButton.addEventListener('click', closeClick); 
formElement.addEventListener('submit', formSubmitHandler);