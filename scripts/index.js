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
 
  //универсальная функция, клонирование блока и добавл значений 
function createNewPlace(placeCard) {
  //дублируем карточки
  const photoCardElement = photoCardTemplate.querySelector('.photo-card').cloneNode(true);
  const imgPopup = photoCardElement.querySelector('.photo-card__picture');
  //карточки добоавляем картинку, имя, альт
  imgPopup.alt = ` Картинка города: ${placeCard.name}`;
  imgPopup.src = placeCard.link;
  descriptionPopup = photoCardElement.querySelector('.photo-card__description-text');
  descriptionPopup.textContent = placeCard.name;
  //попап zoom картинку
    imgPopup.addEventListener('click', (evt) => {
      openPopup(popupPicture);
      addImage(evt, placeCard.name);
    });
  const likeButton = photoCardElement.querySelector('.photo-card__description-like');
  //нажатие на лайк
  likeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('photo-card__description-like_active'); 
  });
  //мусорка
  const wasteBasket = photoCardElement.querySelector('.photo-card__wastebasket');
    wasteBasket.addEventListener('click', (event) => {
            const cartItem = event.target.closest('.photo-card');
            cartItem.remove();
        });
return photoCardElement
};

// // добавление карточек через массив (изначально на странице)
initialCards.forEach(element => {photoCardsContainer.prepend(createNewPlace(element));
});

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

//попап открывает попап для создания карточки с местом+картинка
openIntoPopup.addEventListener('click', event => {
  openPopup(popupIntro);
});

// функция заполняющая попап c zoom картинкой - значениями 
function addImage (evt, name) {
  pictureCaption.textContent = name;
  pictureCaption.alt = evt.target.alt; 
  picture.src = evt.target.src;
  };

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
});