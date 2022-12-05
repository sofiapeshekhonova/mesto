export default class Card {
  constructor({data, userId, handleCardClick,  handleDeleteClick, handleLikeClick, handleLikeDeleteClick}, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._id = data.owner._id;
    this._cardId = data._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._handleLikeDeleteClick = handleLikeDeleteClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {// забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".photo-card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() { // Запишем разметку в приватное поле _element.
    this._element = this._getTemplate();
    this._сardPicture = this._element.querySelector(".photo-card__picture");

    this._сardPicture.src = this._link;
    this._element.querySelector(".photo-card__description-text").textContent = this._name;
    this._сardPicture.alt = this._name;

    this._likesNums = this._element.querySelector('.photo-card__description-like-counter');
    this._likeButton = this._element.querySelector(".photo-card__description-like");
    this._wasteBasketButton = this._element.querySelector(".photo-card__wastebasket");

    this._getLikeCounter()
    this._checkWhoIsTheOwner()
    this._setEventListeners();

    this._likes.forEach(like => {
      if (like._id == this._userId) {
        this._likeButton.classList.add('photo-card__description-like_active')
      }})
    return this._element;
  }

  handleCardLike(i) {
    this._likeButton.classList.toggle("photo-card__description-like_active");
    this._likes = i.likes;
    this._getLikeCounter()
  }

  handleDeleteCard() {
    this._element.remove();
  }

  _checkWhoIsTheOwner() {
    if(this._id !== this._userId) {
      this._wasteBasketButton.remove();
    }
   }

  _getLikeCounter() {
    this._likesNums.textContent = this._likes.length
  }

  _setEventListeners() {
    this._likeButton.addEventListener ("click", () => {
      if(this._likeButton.classList.contains('photo-card__description-like_active')) {
        this._handleLikeDeleteClick(this._cardId)
      } else {
        this._handleLikeClick(this._cardId)
      }
    });
    this._wasteBasketButton.addEventListener("click", () => {
      this._handleDeleteClick(this._cardId)
    });
    this._сardPicture.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}



