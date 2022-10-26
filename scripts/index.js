import { initialCards} from './Card.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';
// экземпляры класса для проверяемых форм

const popupPicture = document.querySelector('.popup_type_images');
const closeImage = popupPicture.querySelector('.popup__close-icon_type_images');

//кнопки относятся к попап  создание карточки место+картинка
const popupAddCard = document.querySelector('.popup_type_place');
const formNewPlace = popupAddCard.querySelector('.form_type_place');
const closenewPlace = popupAddCard.querySelector('.popup__close-icon_type_place');

const buttonSubmitAddCardPopup = popupAddCard.querySelector('.form__save');

const profile = document.querySelector('.intro')
const profileName = profile.querySelector('.profile__information-name');
const profileJob = profile.querySelector('.profile__information-job');
const buttonOpenEditProfilePopup = profile.querySelector('.profile__information-button');
const buttonOpenAddCardPopup = profile.querySelector('.intro__button');

const allPopups = document.querySelectorAll('.popup');
// относится к попапку с профилем
const popupProfile = document.querySelector('.popup_type_profile');
const formProfile = popupProfile.querySelector('.form_type_profile');
const nameInput = formProfile.querySelector('.form__text_type_name');
const jobInput = formProfile.querySelector('.form__text_type_job');
const closeProfile = popupProfile.querySelector('.popup__close-icon_type_profile');

// //ошибка выскакивающая
const mistake = document.querySelectorAll('.form__text-error');
const mistakeLine = document.querySelectorAll('.form__text');
const inputPlaceName = document.querySelector('.form__text_type_place-name');
const inputPlaceLink = document.querySelector('.form__text_type_place-link');


const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__text',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_inactive',
  inputErrorClass: 'form__text_type_error',
  errorClass: 'form__text-error_active'
};

const profilelidator = new FormValidator(validationConfig, formProfile);
profilelidator.enableValidation();

const cardValidator = new FormValidator(validationConfig, formNewPlace);
cardValidator.enableValidation();

initialCards.forEach((item) => {
  // Создадим экземпляр карточки
 const card = new Card(item, '.photo-cards');
 // Создаём карточку и возвращаем наружу
 const cardElement = card.generateCard();
// Добавляем в DOM
 document.querySelector('.photo-cards-container').prepend(cardElement);
})

//попап открывает попап для создания карточки с местом+картинка
buttonOpenAddCardPopup.addEventListener('click', event => {
  openPopup(popupAddCard);
  cardValidator.makeDisableButton(buttonSubmitAddCardPopup);
  formNewPlace.reset();
});

formNewPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formValue = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value
  }
  const card = new Card(formValue, '.photo-cards').generateCard();
  document.querySelector('.photo-cards-container').prepend(card);
  formValue.textContent = '';
  evt.target.reset();
  disableErrorMessages(popupPicture);
  closePopup(popupAddCard);
});

//открытие попапа с информацией о профиле
buttonOpenEditProfilePopup.addEventListener('click', event => {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

//добавление в форму информации о профиле
formProfile.addEventListener('submit', evt => {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closePopup(popupProfile);
});

// унив функция закрытия и открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnButtonEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnButtonEscape);
}

function closeOnButtonEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened)
    disableErrorMessages()
  }
}

//среди всех попапов, если есть ли у evt.target класс popup открыт или popup_close-icon и только тогда закрывать попап
allPopups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('.popup_close-icon')) {
      closePopup(popup);
      disableErrorMessages()
    }
  });
});

//функции закрывающие разные попапы
closeProfile.addEventListener('click', event => {
  closePopup(popupProfile);
  disableErrorMessages()
});

closeImage.addEventListener('click', evt => {
  closePopup(popupPicture);
});

closenewPlace.addEventListener('click', evt => {
  closePopup(popupAddCard);
  disableErrorMessages();
});

// сброс валидации формы
function disableErrorMessages() {
  mistake.forEach(e => e.textContent = "");
  mistakeLine.forEach(e => e.classList.remove('form__text_type_error'));
}
