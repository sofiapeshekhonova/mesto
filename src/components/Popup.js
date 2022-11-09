export default class Popup {  //отвечает за открытие и закрытие попапа
  constructor(popupSelector) {     //принимает селектор попапа
    this._popup = popupSelector;
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.button == 0) {
        if (
          evt.target.classList.contains("popup_opened") ||
          evt.target.classList.contains("popup__close-icon")
        ) {
          this.close();
        }
      }
    });
  }
}
