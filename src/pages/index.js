import './index.css';

import {
  validationConfig,
  } from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupWithSubmit from '../components/PopupWithSubmit';

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

//попап с подтвержением
const popupConfirmDelete = document.querySelector('.popup_type_confirm');

//для всплыв окно с картинкой
const popupPicture = document.querySelector(".popup_type_images");
//аватар
const popupAvatar = document.querySelector('.popup_type_avatar');
const buttonOpenPopupAvatar =  document.querySelector('.profile__picture-button')
const formAvatar = document.querySelector('.form_type_avatar')

const popupProfileForm = new PopupWithForm(popupProfile, submitPopupProfile);
const popupWithPicture = new PopupWithImage(popupPicture);
const popupCard = new PopupWithForm(popupAddCard, submitpopupCard);
const popupConfirm = new PopupWithSubmit(popupConfirmDelete);
const popupAvatarForm = new PopupWithForm(popupAvatar, submitpopupAvatar);

// берем класс валидации, 1 параметром передаем классы форм, 2- форму профиля
const profileValidator = new FormValidator(validationConfig, formProfile);
profileValidator.enableValidation(); //берем открыт функцию из FormValidator

const cardValidator = new FormValidator(validationConfig, formNewCard);
cardValidator.enableValidation();
const avatarValidator = new FormValidator(validationConfig, formAvatar);
avatarValidator.enableValidation();


const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: 'ab550600-35b1-4663-9beb-46d1e8afd441',
    'Content-Type': 'application/json'
  }
});

//добавляем значения из дом
const userInformation = new UserInfo({
  name: ".profile__information-name",
  personalInformation: ".profile__information-job",
  avatar: '.profile__picture-avatar'
});

let userId
api.getUserInfos()
  .then((user) => {
    userId = user._id;
    userInformation.setUserInfo(user.name, user.about);
    userInformation.setUserAvatar(user.avatar)
  })
  .catch((err) => {
    console.log(err);
  });

//открытие попапа с информацией о профиле
buttonOpenPopupAvatar.addEventListener("click", () => {
  popupAvatarForm.open();
  avatarValidator.disableErrorMessages(); // сбрасываем валидацию (функция из класса)
  avatarValidator.makeDisableButton(); // меняем отображение кнопки  (функция из класса)
});

function submitpopupAvatar(value) {
  popupAvatarForm.renderLoading(true)
  api.saveNewUseravatar(value.avatar)
  .then(user => {
   userInformation.setUserAvatar(user.avatar);
    popupAvatarForm.close()
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupAvatarForm.renderLoading(false)
  });
}

buttonOpenEditProfilePopup.addEventListener("click", () => {
  popupProfileForm.open();
  const input = userInformation.getUserInfo();
  //value инпута формы = textcontent из функции getUserInfo в классе userInfo
  nameInput.value = input.name;
  jobInput.value = input.personalInformation;
  profileValidator.disableErrorMessages();
});

function submitPopupProfile(value) { //value инпута формы.
  popupProfileForm.renderLoading(true)
  //забирает данные из импута формы и передает на сервер (Name( name="Name" из html))
  api.saveNewUserInfo(value.Name, value.Job)
  .then(user => { ////в нтмл. setUserInfo из класса (данные с севера.имя/раюота))
      userInformation.setUserInfo(user.name, user.about);
      popupProfileForm.close()
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupProfileForm.renderLoading(false)
  });
}

function createCard(item) {
  // Создадим экземпляр карточки 2 пр template карточки(с лайками и т.д.) 3- попап с картинкой
  const card = new Card({data: item, userId: userId,
    handleCardClick: (name, link) => { //открываем попап с картинкой name и link берем из PopupWithImage
      popupWithPicture.open(name, link);
    },
    handleDeleteClick: (cardId) => {
        popupConfirm.open()
        popupConfirm.setSubmit(() => {
              api.removeCard(cardId)
                .then(() => {
                  card.handleDeleteCard()
                  popupConfirm.close()
                })
                .catch((err) => {
                  console.log(err);
                });
            })
      },
      handleLikeClick: (cardId) => {
        api.putLikeCard(cardId)
        .then((i) => {
         card.handleCardLike(i)
        })
        .catch((err) => {
          console.log(err);
        });
      },
      handleLikeDeleteClick: (cardId) => {
        api.deleteLike(cardId)
        .then((i) => {
          card.handleCardLike(i)
         })
         .catch((err) => {
           console.log(err);
         });
      }
    }, ".photo-cards"
  );

  // Создаём карточку и возвращаем наружу
  const cardItem = card.generateCard();
  return cardItem;
}

const cardList = new Section(
  {renderer: (item) => {
      //добавляем созданную карточку на страницу, функция из класса section
      cardList.addInitialItem(createCard(item));
    },
  },".photo-cards-container"
);

//aпи + данные с сервера для кардс, после рендерим на страницу
api.getInitialCards().then((cards) => {
  cardList.renderItems(cards); //функция из класса section, чтобы renderer заработал
}).catch((err) => {
  console.log(err);
});

//при клике на кнопку открывает попап для создания карточки с местом+картинка
buttonOpenAddCardPopup.addEventListener("click", () => {
  popupCard.open();
  cardValidator.disableErrorMessages(); // сбрасываем валидацию (функция из класса)
  cardValidator.makeDisableButton(); // меняем отображение кнопки  (функция из класса)
});

function submitpopupCard(data) {
  //в данные сервера добавляем значения из инпутов формы
  popupCard.renderLoading(true)
  api.sendNewCard(data.placeName, data.placeLink)
  .then((e) => { //добавляем значения из сервера на страницу
    cardList.addItem(createCard(e));
    popupCard.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupCard.renderLoading(false)
  });
}

popupWithPicture.setEventListeners();
popupCard.setEventListeners();
popupProfileForm.setEventListeners();
popupConfirm.setEventListeners();
popupAvatarForm.setEventListeners();
