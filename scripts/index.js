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

//секция контейнер для карточек
const photoCardsContainer = document.querySelector('.photo-cards-container')
const photoCardTemplate = document.querySelector('.photo-cards').content;

//кнопки относятся к попап  создание карточки место+картинка
const popupAddCard = document.querySelector('.popup_type_place');
const formNewPlace = popupAddCard.querySelector('.form_type_place');
const closenewPlace = popupAddCard.querySelector('.popup__close-icon_type_place');

//попап с всплыв картинкой и подписью
const popupPicture = document.querySelector('.popup_type_images');
const closeImage = popupPicture.querySelector('.popup__close-icon_type_images');
const pictureCaption = popupPicture.querySelector('.popup__picture-caption');
const picture = popupPicture.querySelector('.popup__picture');

//унив функция закрытия и открытия попапа
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
    allPopups.forEach(popup => closePopup(popup));
  }
}

// allPopups.forEach(popup => {
//   popup.addEventListener('mousedown', evt => {
//     if (evt.target === popup || evt.target.classList.contains('.popup_close-icon')){
//       closePopup (popup)
//     }
//   });
// });

//среди всех попапов, если есть ли у evt.target класс popup открыт или popup_close-icon и только тогда закрывать попап
allPopups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('.popup_close-icon')) {
      closePopup(popup);
    }
  });
});

// //ошибка выскакивающая
const mistake = document.querySelectorAll('.form__text-error');

const inputPlaceName = document.querySelector('.form__text_type_place-name');
const inputPlaceLink = document.querySelector('.form__text_type_place-link');

  //универсальная функция, клонирование блока и добавл значений 
function createNewPlace(placeCard) {
  //дублируем карточки
  const photoCardElement = photoCardTemplate.cloneNode(true);
  const imgPopup = photoCardElement.querySelector('.photo-card__picture'); 

  imgPopup.src = placeCard.link; 
  imgPopup.alt = placeCard.name; 
  photoCardElement.querySelector('.photo-card__description-text').textContent = placeCard.name;

  // imgPopup.addEventListener('click', (evt) => { openImagePopup(evt, placeCard.name); });
  
  setListenersForItem(photoCardElement);

  return photoCardElement
};

//все слушатели (попап, лайк, мусорка)
function setListenersForItem(element) {
  const wasteBasket = element.querySelector('.photo-card__wastebasket');
  wasteBasket.addEventListener('click', deletePicture);

  const likeButton = element.querySelector('.photo-card__description-like');
  likeButton.addEventListener('click', clickLike);

  element.querySelector('.photo-card__picture').addEventListener('click', openImagePopup);
}

// функция заполняющая попап c zoom картинкой - значениями 
function openImagePopup (evt, name) {
  openPopup(popupPicture);
  picture.src = evt.target.src;
  picture.alt = evt.target.alt; 
  // pictureCaption.textContent = name;
  pictureCaption.textContent = evt.target.alt;
  };


// // добавление карточек через массив (изначально на странице)
initialCards.forEach(element => {photoCardsContainer.prepend(createNewPlace(element));
});

//активный лайк 
function clickLike(evt) {
  evt.target.classList.toggle('photo-card__description-like_active'); 
}

//удаление карточки 
function deletePicture(event) {
  const cartItem = event.target.closest('.photo-card');
  cartItem.remove();
}


//добавление в форму(для создание новой карточки) значений
formNewPlace.addEventListener('submit', (evt) => {
  evt.preventDefault(); 
  const formValue = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value,
  }
  photoCardsContainer.prepend(createNewPlace(formValue));
  evt.target.reset(); 
  closePopup(popupAddCard);
});

const buttonSubmitAddCardPopup = popupAddCard.querySelector('.form__save');
//попап открывает попап для создания карточки с местом+картинка
buttonOpenAddCardPopup.addEventListener('click', event => {
  openPopup(popupAddCard);
  makeDisableButton(buttonSubmitAddCardPopup);
  formNewPlace.reset();
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

//функции закрывающие разные попапы 
closeProfile.addEventListener('click', event => {
  closePopup(popupProfile);
});

closeImage.addEventListener('click', evt => {
  closePopup(popupPicture);
});

closenewPlace.addEventListener('click', evt => {
  closePopup(popupAddCard);
  disableErrorMessages();
});

function disableErrorMessages() {
  mistake.forEach(e => e.textContent = "");
}