import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {  //Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
  constructor(popup, submitForm) {
    super(popup);
    this._submitForm = submitForm;
    // Найдём все инпуты формы, сделаем из них массив методом Array.from
    this._formInputs = Array.from(this._popup.querySelectorAll(".form__text"));
    this._popupForm = this._popup.querySelector(".form");
    this._buttonSave = this._popup.querySelector('.form__save')
    this._buttonSaveText = this._buttonSave.textContent
  }

  _getInputValues() {    //собирает данные всех полей формы.
    this._formInputValues = {};
    this._formInputs.forEach((input) => {
      this._formInputValues[input.name] = input.value;
    });
    return this._formInputValues;
  }

  // setInputValue(elements) {
  //   this._formInputs.forEach((element) => {
  //     element.value = elements[element.name]
  //     console.log(elements)
  //   })
  // }

  renderLoading(isLoading, loadingText = 'Сохранение...') {
    if(isLoading) {
      this._buttonSave.textContent = loadingText
    } else {
      this._buttonSave.textContent = this._buttonSaveText;
    }
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
