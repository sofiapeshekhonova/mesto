const profile = document.querySelector('.intro')
const profileName = profile.querySelector('.profile__information-name');
const profileJob = profile.querySelector('.profile__information-job');
const openProfilePopup = profile.querySelector('.profile__information-button');
const openIntoPopup = profile.querySelector('.intro__button');

// относится к попапку с профилем
const popupProfile = document.querySelector('.popup_profile');
const formProfile = popupProfile.querySelector('.form_profile');
const nameInput = formProfile.querySelector('.form__text_type_name');
const jobInput = formProfile.querySelector('.form__text_type_job');
const closeProfile = popupProfile.querySelector('.popup__closeIcon_profile');

//секция контейнер для карточек
const photoCardsContainer = document.querySelector('.photo-cards-container')
const photoCardTemplate = document.querySelector('.photo-cards').content;

//кнопки относятся к попап  создание карточки место+картинка
const popupIntro = document.querySelector('.popup_newPlace');
const formNewPlace = popupIntro.querySelector('.form_newPlace');
const closenewPlace = popupIntro.querySelector('.popup__closeIcon_newPlace');

//попап с большой картинкой и подписью
const popupPicture = document.querySelector('.popup_images');
const closeImage = popupPicture.querySelector('.popup__closeIcon_images');

//унив функция закрытия и открытия попапа
const popup = document.querySelector('.popup')
const openPopup = (popup) => popup.classList.add('popup_opened');
const closePopup = (popup) => popup.classList.remove('popup_opened');
 
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

  //универсальная функция, клонирование блока и добавл значений 
function createNewPlace(name, link) {
  //дубль карточки
  const photoCardElement = photoCardTemplate.querySelector('.photo-card').cloneNode(true);
  //берем картинку
  const imgPopup = photoCardElement.querySelector('.photo-card__picture');
  //копируем значения
  imgPopup.alt = ` Картинка города: ${name}`;
  imgPopup.src = link;
  photoCardElement.querySelector('.photo-card__description-text').textContent = name;

  //открытие попап картинки
  const popupPicture = document.querySelector('.popup_images');
    imgPopup.addEventListener('click', (evt) => {
      openPopup(popupPicture);
      addImage(evt, name);
    });
  const likeButton = photoCardElement.querySelector('.photo-card__description-like');
  //добавляем слушатель нажатия like
  likeButton.addEventListener('click', evt => {
    evt.target.classList.toggle('photo-card__description-like_active'); 
  });
  const wasteBasket = photoCardElement.querySelectorAll('.photo-card__wasteBasket');
  wasteBasket.forEach(result => {
    result.addEventListener('click', () => {
        const cartItem = result.closest('.photo-card');
        cartItem.parentElement.removeChild(cartItem);
    });
  });
  photoCardsContainer.prepend(photoCardElement);
};

// функция заполняющая попап картинкой
function addImage (evt, name) {
  const pictureCaption = popupPicture.querySelector('.popup_images_pictureCaption');
  pictureCaption.textContent = name;

  const pictureCaptionАlt = popupPicture.querySelector('.popup_images_picture');
  pictureCaptionАlt.alt = evt.target.alt;
    
  const picture = popupPicture.querySelector('.popup_images_picture');
  picture.src = evt.target.src;
  };

// добавление карточек через массив
initialCards.forEach(element => createNewPlace(element.name, element.link));
  
//попап открывает попап для создания карточки с местом+картинка
openIntoPopup.addEventListener('click', event => {
  openPopup(popupIntro);
});

//открытие попапа с информацией о профиле 
openProfilePopup.addEventListener('click', event => {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

closeProfile.addEventListener('click', event => {
  closePopup(popupProfile);
});

closeImage.addEventListener('click', evt => {
  closePopup(popupPicture);
});

closenewPlace.addEventListener('click', evt => {
  closePopup(popupIntro);
});

formProfile.addEventListener('submit', evt => {
  evt.preventDefault(); 
  const nameValue = nameInput.value; 
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue; 
  closePopup(popupProfile);
});

// добавление созданной карточки при нажатии 
formNewPlace.addEventListener('submit', (evt) => {
  evt.preventDefault(); 
  const name = formNewPlace.querySelector('.form__text_type_placeName');
  const link = formNewPlace.querySelector('.form__text_type_placeLink');
  createNewPlace(name.value, link.value);
  evt.target.reset(); 
  closePopup(popupIntro);
});
  
