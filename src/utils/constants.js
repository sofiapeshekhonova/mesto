export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__text",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: "form__save_inactive",
  inputErrorClass: "form__text_type_error",
  errorClass: "form__text-error_active",
};

//const photoCardsContainer = document.querySelector(".photo-cards-container");

//кнопки относятся к попап  создание карточки место+картинка
export const popupAddCard = document.querySelector(".popup_type_place");
export const formNewCard = popupAddCard.querySelector(".form_type_place");

// относится к попапку с профилем
export const popupProfile = document.querySelector(".popup_type_profile");
export const formProfile = popupProfile.querySelector(".form_type_profile");
export const nameInput = formProfile.querySelector(".form__text_type_name");
export const jobInput = formProfile.querySelector(".form__text_type_job");

export const profile = document.querySelector(".intro");
export const buttonOpenAddCardPopup = profile.querySelector(".intro__button");
// const profileName = profile.querySelector(".profile__information-name");
// const profileJob = profile.querySelector(".profile__information-job");
export const buttonOpenEditProfilePopup = profile.querySelector(
  ".profile__information-button"
);

//для всплыв окно с картинкой
export const popupPicture = document.querySelector(".popup_type_images");
