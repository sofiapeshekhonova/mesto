
import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {  //Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
  constructor(popup) {
    super(popup);
    this._popupForm = this._popup.querySelector(".form");
  }

  setSubmit(handleDelete){
    this.submitForm = handleDelete;
  }

  setEventListeners() { //обработчик сабмита формы.
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.submitForm(this);
    });
  }
}
