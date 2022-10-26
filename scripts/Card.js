export const initialCards = [
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

export default class Card {
  constructor(data, templateSelector) {
    this._link = data.link
    this._name = data.name;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {  // забираем разметку из HTML и клонируем элемент
  const cardElement = document
  .querySelector(this._templateSelector)
  .content
  .querySelector('.photo-card')
  .cloneNode(true);

// вернём DOM-элемент карточки
  return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners();

    // Добавим данные
    this._element.querySelector('.photo-card__picture').src = this._link;
    this._element.querySelector('.photo-card__description-text').textContent = this._name;
    this._element.querySelector('.photo-card__picture').alt = this._name;

    return this._element;
  }

   _handleCardLike(event) {
    this._element.querySelector('.photo-card__description-like').classList.toggle('photo-card__description-like_active');
  }

  _handleOpenPopup() {
    picture.src = this._link;
    pictureCaption.textContent = this._name;
    openPopup(popupPicture);
  }

  _handleDeleteCard() {
      this._element.remove();
      // this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.photo-card__description-like').addEventListener('click', () => {
      this._handleCardLike();
    });
    this._element.querySelector('.photo-card__wastebasket').addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._element.querySelector('.photo-card__picture').addEventListener('click', () => {
      this._handleOpenPopup();
    });
  }
}


