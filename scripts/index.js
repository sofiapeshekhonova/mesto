import {initialCards} from "./initialCards.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

const photoCardsContainer = document.querySelector(".photo-cards-container");
const allPopups = document.querySelectorAll(".popup");

//кнопки относятся к попап  создание карточки место+картинка
const popupAddCard = document.querySelector(".popup_type_place");
const formNewCard = popupAddCard.querySelector(".form_type_place");

// относится к попапку с профилем
const popupProfile = document.querySelector(".popup_type_profile");
const formProfile = popupProfile.querySelector(".form_type_profile");
const nameInput = formProfile.querySelector(".form__text_type_name");
const jobInput = formProfile.querySelector(".form__text_type_job");

const profile = document.querySelector(".intro");
const buttonOpenAddCardPopup = profile.querySelector(".intro__button");
const profileName = profile.querySelector(".profile__information-name");
const profileJob = profile.querySelector(".profile__information-job");
const buttonOpenEditProfilePopup = profile.querySelector(".profile__information-button");

// форма новое место инпуты
const inputPlaceName = document.querySelector(".form__text_type_place-name");
const inputPlaceLink = document.querySelector(".form__text_type_place-link");

//для всплыв окно с картинкой
const popupPicture = document.querySelector(".popup_type_images");
const pictureCaption = popupPicture.querySelector(".popup__picture-caption");
const picture = popupPicture.querySelector(".popup__picture");

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__text",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: "form__save_inactive",
  inputErrorClass: "form__text_type_error",
  errorClass: "form__text-error_active",
};

// берем класс валидации, 1 параметром передаем классы форм, 2- форму профиля
const profileValidator = new FormValidator(validationConfig, formProfile);
profileValidator.enableValidation(); //берем открыт функцию из FormValidator

const cardValidator = new FormValidator(validationConfig, formNewCard);
cardValidator.enableValidation();

//массив с зазваниями и фотками,каждый добавляем в дом
initialCards.forEach((item) => {
  //Добавляем в DOM
  photoCardsContainer.prepend(createCard(item));
});

function createCard(item) {
  // Создадим экземпляр карточки 2 пр template карточки(с лайками и т.д.) 3- попап с картинкой
  const card = new Card(item, ".photo-cards", handleOpenPopup);
 // Создаём карточку и возвращаем наружу
  const cardItem = card.generateCard();
  return cardItem;
}

//попап открывает попап для создания карточки с местом+картинка
buttonOpenAddCardPopup.addEventListener("click", (event) => {
  openPopup(popupAddCard);
  formNewCard.reset(); //сбрасываем текст в инпутах
  cardValidator.disableErrorMessages(); // сбрасываем валидацию (функция из класса)
});

//создание карточки с местом+картинка
formNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const formValue = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value,
  };
  photoCardsContainer.prepend(createCard(formValue));
  evt.target.reset();
  closePopup(popupAddCard);
});

//открытие попапа с информацией о профиле
buttonOpenEditProfilePopup.addEventListener("click", (event) => {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  profileValidator.disableErrorMessages();
});

//добавление в форму информации о профиле
formProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closePopup(popupProfile);
});

// унив функция закрытия и открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnButtonEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnButtonEscape);
}

function closeOnButtonEscape(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

//среди всех попапов, если есть ли у evt.target класс popup открыт или popup_close-icon и только тогда закрывать попап
allPopups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.button == 0) {
        if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close-icon")) {
      closePopup(popup);
    }}
  });
});

function handleOpenPopup(name, link) {
  picture.src = link;
  picture.alt = name;
  pictureCaption.textContent = name;
  openPopup(popupPicture);
}
