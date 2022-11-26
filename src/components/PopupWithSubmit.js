
import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {  //Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".form");
  }

  setSubmit(del){
    this.submitForm = del;
  }

  setEventListeners() { //обработчик сабмита формы.
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.submitForm(this);
    });
  }
}
