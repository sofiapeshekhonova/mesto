import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {  //Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    // Найдём все инпуты формы, сделаем из них массив методом Array.from
    this._formInputs = Array.from(this._popup.querySelectorAll(".form__text"));
    this._popupForm = this._popup.querySelector(".form");
  }

  _getInputValues() {    //собирает данные всех полей формы.
    this._formInputValues = {};
    this._formInputs.forEach((input) => {
      this._formInputValues[input.name] = input.value;
    });
    return this._formInputValues;
  }

  close() {
    super.close();
    this._popupForm.reset(); //сбрасываем текст в инпутах формы
  }

  setEventListeners() { //обработчик сабмита формы.
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }
}
