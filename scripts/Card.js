export default class Card {
  constructor(data, templateSelector, handleOpenPopup) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup
  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".photo-card")
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();

    // Добавим данные
    this._element.querySelector(".photo-card__picture").src = this._link;
    this._element.querySelector(".photo-card__description-text").textContent = this._name;
    this._element.querySelector(".photo-card__picture").alt = this._name;

    this._likeButton =  this._element.querySelector(".photo-card__description-like");
    this._wasteBasketButton= this._element.querySelector(".photo-card__wastebasket");
    this._setEventListeners();

    return this._element;
  }

  _handleCardLike() {
    this._likeButton.classList.toggle("photo-card__description-like_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
        this._handleCardLike();
      });
      this._wasteBasketButton.addEventListener("click", () => {
        this._handleDeleteCard();
      });
    this._element.querySelector(".photo-card__picture").addEventListener("click", () => {
        this._handleOpenPopup(this._name, this._link);
      });
  }
}
