import './index.css';

import {
  initialCards,
  validationConfig,
  popupAddCard,
  formNewCard,
  popupProfile,
  formProfile,
  nameInput,
  jobInput,
  buttonOpenAddCardPopup,
  buttonOpenEditProfilePopup,
  popupPicture,
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

//добавляем значения из дом
const userInformation = new UserInfo({
  name: ".profile__information-name",
  personalInformation: ".profile__information-job",
});
const addPopupPicture = new PopupWithImage(popupPicture);

// берем класс валидации, 1 параметром передаем классы форм, 2- форму профиля
const profileValidator = new FormValidator(validationConfig, formProfile);
profileValidator.enableValidation(); //берем открыт функцию из FormValidator

const cardValidator = new FormValidator(validationConfig, formNewCard);
cardValidator.enableValidation();

const addPopupProfile = new PopupWithForm(popupProfile, submitPopupProfile);

//открытие попапа с информацией о профиле
buttonOpenEditProfilePopup.addEventListener("click", () => {
  addPopupProfile.open();
  const input = userInformation.getUserInfo();
  //value инпута формы = textcontent из функции getUserInfo в классе userInfo
  nameInput.value = input.name;
  jobInput.value = input.personalInformation;
  profileValidator.disableErrorMessages();
});

function submitPopupProfile(data) {
  //текстконтект инпутов на странице -  data(value инпута формы).Name( name="Name" из html)
  userInformation.setUserInfo(data.Name, data.Job);
  addPopupProfile.close();
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
cardList.renderItems();

const popupCard = new PopupWithForm(popupAddCard, submitProfileForm);
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
  addPopupPicture.open(name, link);
}

addPopupPicture.setEventListeners();
popupCard.setEventListeners();
addPopupProfile.setEventListeners();
