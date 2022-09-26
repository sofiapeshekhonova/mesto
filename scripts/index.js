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


// Проектная работа 6

// Функция, которая добавляет класс с ошибкой + текст ошибки 2 параметром
const showInputError = (formProfile, textInput, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const formError = formProfile.querySelector(`.${textInput.id}-error`); 

  textInput.classList.add('form__text_type_error');
// Заменим содержимое span с ошибкой на переданный параметр
  formError.textContent = errorMessage;
   // Показываем сообщение об ошибке
  formError.classList.add('form__text-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formProfile, textInput) => {
  const formError = formProfile.querySelector(`.${textInput.id}-error`); 
  textInput.classList.remove('form__text_type_error');
  formError.classList.remove('form__text-error_active');
// Очистим ошибку
  formError.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formProfile, textInput) => {
  if (!textInput.validity.valid) {
    // showInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
    // Если поле не проходит валидацию, покажем ошибку + 2- сообщение об ошибке
    showInputError(formProfile, textInput, textInput.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
    // Если проходит, скроем
    hideInputError(formProfile, textInput);
  }
};

const setEventListeners = (formProfile) => {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(formProfile.querySelectorAll('.form__text'));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = formProfile.querySelector('.form__save');
    //нужно ли чтобы была заблокированна в самом начале?
    // changeButton(inputList, buttonElement);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((textInput) => {
    // каждому полю добавим обработчик события input
    textInput.addEventListener('input', function () {
      // Внутри колбэка вызовем isValid передав ей форму и проверяемый элемент
      isValid(formProfile, textInput)
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      changeButton(inputList, buttonElement);
    });
  });
}; 

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.form'));
  // Переберём полученную коллекцию
  formList.forEach((formProfile) => {
    formProfile.addEventListener('submit', function (evt) {
            evt.preventDefault();
    });
    // если бы внутри формы были другие формы (несколько шагов заполнения -шаг - филсет)
    // const fieldsetList = Array.from(formProfile.querySelectorAll('.form__set'));
    // fieldsetList.forEach((fieldset) => {
    //   setEventListeners(fieldset);
    // })

    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formProfile);
   
  });
};

// Вызовем функцию
enableValidation(); 

// Функция принимает массив полей, проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита
const hasfalseInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((textInput) => {
// Если поле не валидно, колбэк вернёт true
// Обход массива прекратится и вся функция hasInvalidInput вернёт true
    return !textInput.validity.valid;
  })
}; 

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const changeButton = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasfalseInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('form__save_inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('form__save_inactive');
    buttonElement.removeAttribute('disabled', true);
  }
}; 

