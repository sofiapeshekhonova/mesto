export default class FormValidator {
  constructor(data, formElement) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
    // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    //из нужной формы берем кнопку сохранить
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector //кнопка сохранить
    );
  }

  enableValidation() {
    this._setEventListeners();
  }

  __toggleInputErrorState(textInput) {
    if (!textInput.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку + 2- сообщение об ошибке
      this._showInputError(textInput, textInput.validationMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(textInput);
    }
  }

  _setEventListeners() {
    // чтобы была заблокированна в самом начале
    this._changeShapeButton();
    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((textInput) => {
      // каждому полю добавим обработчик события input
      textInput.addEventListener("input", () => {
        // Внутри колбэка вызовем _toggleInputErrorState передав ей проверяемый элемент
        this.__toggleInputErrorState(textInput);
        //заблок кнопка
        this._changeShapeButton();
      });
    });
  }

  _changeShapeButton() {
    if (this._hasFalseInput(this._inputList)) {
      // сделай кнопку неактивной
      this._makeDisableButton(this._buttonElement);
    } else {
      // иначе сделай кнопку активной
      this._removeDisableButton(this._buttonElement);
    }
  }

  _hasFalseInput() {
    // проходим по этому массиву методом some
    return this._inputList.some((textInput) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция hasInvalidInput вернёт true
      return !textInput.validity.valid;
    });
  }

  _makeDisableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass); //добавляем класс неактивной копки
    this._buttonElement.setAttribute("disabled", true); //делаем кнопку неактивной
  }

  _removeDisableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);  //убираем
    this._buttonElement.removeAttribute("disabled"); // убираем
  }

  _showInputError(textInput, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    this._formError = this._formElement.querySelector(`.${textInput.id}-error`);
    textInput.classList.add(this._inputErrorClass);
    // Показываем сообщение об ошибке
    this._formError.classList.add(this._errorClass);
    this._formError.textContent = errorMessage;
  }

  _hideInputError(textInput) {
    this._formError = this._formElement.querySelector(`.${textInput.id}-error`);
    textInput.classList.remove(this._inputErrorClass);
    this._formError.classList.remove(this._errorClass);
    // Очистим ошибку
    this._formError.textContent = "";
  }

  disableErrorMessages() {
    this._inputList.forEach(e => this._hideInputError(e));
  }
}
