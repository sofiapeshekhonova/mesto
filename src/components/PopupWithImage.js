import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._link = this._popup.querySelector(".popup__picture");
    this._name = this._popup.querySelector(".popup__picture-caption");
  }

  open(name, link) {
    super.open();
    this._link.src = link;
    this._name.alt = name;
    this._name.textContent = name;
  }
}
