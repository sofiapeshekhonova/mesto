import './index.css';

import {
  initialCards,
  validationConfig,
  } from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

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
const buttonOpenEditProfilePopup = profile.querySelector(".profile__information-button");

//для всплыв окно с картинкой
const popupPicture = document.querySelector(".popup_type_images");

//добавляем значения из дом
const userInformation = new UserInfo({
  name: ".profile__information-name",
  personalInformation: ".profile__information-job",
});

const popupProfileForm = new PopupWithForm(popupProfile, submitPopupProfile);
const popupWithPicture = new PopupWithImage(popupPicture);
const popupCard = new PopupWithForm(popupAddCard, submitProfileForm);

// берем класс валидации, 1 параметром передаем классы форм, 2- форму профиля
const profileValidator = new FormValidator(validationConfig, formProfile);
profileValidator.enableValidation(); //берем открыт функцию из FormValidator

const cardValidator = new FormValidator(validationConfig, formNewCard);
cardValidator.enableValidation();

//открытие попапа с информацией о профиле
buttonOpenEditProfilePopup.addEventListener("click", () => {
  popupProfileForm.open();
  const input = userInformation.getUserInfo();
  //value инпута формы = textcontent из функции getUserInfo в классе userInfo
  nameInput.value = input.name;
  jobInput.value = input.personalInformation;
  profileValidator.disableErrorMessages();
});

function submitPopupProfile(data) {
  //текстконтект инпутов на странице -  data(value инпута формы).Name( name="Name" из html)
  userInformation.setUserInfo(data.Name, data.Job);
  popupProfileForm.close();
}

function createCard(item) {
  // Создадим экземпляр карточки 2 пр template карточки(с лайками и т.д.) 3- попап с картинкой
  const card = new Card(item, ".photo-cards", handleCardClick);
  // Создаём карточку и возвращаем наружу
  const cardItem = card.generateCard();
  return cardItem;
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      //добавляем созданную карточку на страницу, функция из класса section
      cardList.addItem(createCard(item));
    },
  },
  ".photo-cards-container"
);

//функция из класса section, чтобы renderer заработал
cardList.renderItems(initialCards);

//при клике на кнопку открывает попап для создания карточки с местом+картинка
buttonOpenAddCardPopup.addEventListener("click", () => {
  popupCard.open();
  cardValidator.disableErrorMessages(); // сбрасываем валидацию (функция из класса)
  cardValidator.makeDisableButton(); // меняем отображение кнопки  (функция из класса)
});

function submitProfileForm(data) {
  const formValue = {
    //имя карточки = data(value инпута формы).Name( name="placeName" из html)
    name: data.placeName,
    link: data.placeLink,
  };
  cardList.addItem(createCard(formValue));
  popupCard.close();
}

//открываем попап с картинкой name и link берем из PopupWithImage
function handleCardClick(name, link) {
  popupWithPicture.open(name, link);
}

popupWithPicture.setEventListeners();
popupCard.setEventListeners();
popupProfileForm.setEventListeners();
