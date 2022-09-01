
let container = document.querySelector('.content');
let openPopup = container.querySelector('.profile__information-button');
let closeButton = container.querySelector('.popup__icon');
let popup = container.querySelector('.popup');
let formElement = container.querySelector('.form');
let nameInput = container.querySelector('.popup__text_name');
let jobInput = container.querySelector('.popup__text_job');
let saveButton = container.querySelector('.popup__save');
let profilename = document.querySelector('.profile__information-name');
let profilejob = document.querySelector('.profile__information-job');

openPopup.addEventListener('click', () =>  {
  popup.classList.add('popup_opened');
})


function closeClick() {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closeClick); 
saveButton.addEventListener('click', closeClick);

function formSubmitHandler (evt) {
// или так const formSubmitHandler = (event) => {
  evt.preventDefault(); 
  const name = nameInput.value;
  const job = jobInput.value;
  profilename.textContent = name;
  profilejob.textContent = job;   
}

formElement.addEventListener('submit', formSubmitHandler);