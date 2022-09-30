const profile = document.querySelector('.intro')
const profileName = profile.querySelector('.profile__information-name');
const profileJob = profile.querySelector('.profile__information-job');
const openProfilePopup = profile.querySelector('.profile__information-button');
const openIntoPopup = profile.querySelector('.intro__button');

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
const popupIntro = document.querySelector('.popup_type_place');
const formNewPlace = popupIntro.querySelector('.form_type_place');
const closenewPlace = popupIntro.querySelector('.popup__close-icon_type_place');

//попап с всплыв картинкой и подписью
const popupPicture = document.querySelector('.popup_type_images');
const closeImage = popupPicture.querySelector('.popup__close-icon_type_images');
const pictureCaption = popupPicture.querySelector('.popup__picture-caption');
const picture = popupPicture.querySelector('.popup__picture');

//унив функция закрытия и открытия попапа
const openPopup = (popup) => popup.classList.add('popup_opened');
const closePopup = (popup) => popup.classList.remove('popup_opened');

//ошибка выскакивающая
const mistake = document.querySelectorAll('.form__text-error');

  //универсальная функция, клонирование блока и добавл значений 
function createNewPlace(placeCard) {
  //дублируем карточки
  const photoCardElement = photoCardTemplate.cloneNode(true);

  photoCardElement.querySelector('.photo-card__picture').src = placeCard.link;
  photoCardElement.querySelector('.photo-card__picture').alt = ` Картинка города: ${placeCard.name}`;
  photoCardElement.querySelector('.photo-card__description-text').textContent = placeCard.name;

  const imgPopup = photoCardElement.querySelector('.photo-card__picture');
  imgPopup.addEventListener('click', (evt) => { addImage(evt, placeCard.name); });
  
  setListenersForItem(photoCardElement);

  return photoCardElement
};

//все слушатели (попап, лайк, мусорка)
function setListenersForItem(element) {
  const wasteBasket = element.querySelector('.photo-card__wastebasket');
  wasteBasket.addEventListener('click', deletePicture);

  const likeButton = element.querySelector('.photo-card__description-like');
  likeButton.addEventListener('click', clickLike);

  // element.querySelector('.photo-card__picture').addEventListener('click', addImage);
}

// функция заполняющая попап c zoom картинкой - значениями 
function addImage (evt, name) {
  openPopup(popupPicture);
  picture.src = evt.target.src;
  picture.alt = evt.target.alt; 
  pictureCaption.textContent = name;
  // pictureCaption.textContent = evt.target.alt;
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
  const placeName = formNewPlace.querySelector('.form__text_type_place-name');
  const placeImage = formNewPlace.querySelector('.form__text_type_place-link');
  const formValue = {
    name: placeName.value,
    link: placeImage.value,
  }
  photoCardsContainer.prepend(createNewPlace(formValue));
  evt.target.reset(); 
  closePopup(popupIntro);
});

const saveForm = popupIntro.querySelector('.form__save');
//попап открывает попап для создания карточки с местом+картинка
openIntoPopup.addEventListener('click', event => {
  openPopup(popupIntro);
  makeDisableButton(saveForm);
  formNewPlace.reset();
});

//открытие попапа с информацией о профиле 
openProfilePopup.addEventListener('click', event => {
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
  closePopup(popupIntro);
  disableErrorMessages();
});

function disableErrorMessages() {
  mistake.forEach(e => e.textContent = "");
}

document.addEventListener('mousedown', evt => {
  if ( evt.target == popupIntro) {
   closePopup(popupIntro);
}
else if (evt.target == popupProfile) {
 closePopup(popupProfile);
}
else if (evt.target == popupPicture) {
 closePopup(popupPicture);
}
});

document.addEventListener('keydown', evt => {
if  (evt.key === 'Escape')  {
closePopup(popupIntro);
closePopup(popupPicture);
closePopup(popupProfile);
}
});

