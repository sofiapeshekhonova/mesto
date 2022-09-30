const enableValidation = { 
  formSelector: '.form',
  inputSelector: '.form__text',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_inactive',
  inputErrorClass: 'form__text_type_error',
  errorClass: 'form__text-error_active'
};


function checkValidation(enableValidation) {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
  // Переберём полученную коллекцию
  formList.forEach((form) => {
    form.addEventListener('submit', function (evt) {
            evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(form, enableValidation);
  });
};

function setEventListeners(form, enableValidation) {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(form.querySelectorAll(enableValidation.inputSelector));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = form.querySelector(enableValidation.submitButtonSelector);
  // чтобы была заблокированна в самом начале 
  changeButton(inputList, buttonElement, enableValidation);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((textInput) => {
    // каждому полю добавим обработчик события input
    textInput.addEventListener('input', function () {
      // Внутри колбэка вызовем isValid передав ей форму и проверяемый элемент
      isValid(form, textInput, enableValidation)
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      changeButton(inputList, buttonElement, enableValidation);
    });
  });
}; 

// Функция, которая проверяет валидность поля
function isValid (form, textInput, enableValidation) {
  if (!textInput.validity.valid) {
    // showInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
    // Если поле не проходит валидацию, покажем ошибку + 2- сообщение об ошибке
    showInputError(form, textInput, textInput.validationMessage, enableValidation);
  } else {
    // hideInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле
    // Если проходит, скроем
    hideInputError(form, textInput, enableValidation);
  }
};


// Функция, которая добавляет класс с ошибкой + текст ошибки 2 параметром
function showInputError(form, textInput, errorMessage, enableValidation) {
  // Находим элемент ошибки внутри самой функции
  const formError = form.querySelector(`.${textInput.id}-error`); 

  textInput.classList.add(enableValidation.inputErrorClass);
// Заменим содержимое span с ошибкой на переданный параметр
  formError.textContent = errorMessage;
   // Показываем сообщение об ошибке
  formError.classList.add(enableValidation.errorClass);
};

// Функция, которая удаляет класс с ошибкой
function hideInputError(form, textInput, enableValidation)  {
  const formError = form.querySelector(`.${textInput.id}-error`); 
  textInput.classList.remove(enableValidation.inputErrorClass);
  formError.classList.remove(enableValidation.errorClass);
// Очистим ошибку
  formError.textContent = '';
};

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
function changeButton(inputList, buttonElement, enableValidation){
  // Если есть хотя бы один невалидный инпут
  if (hasfalseInput(inputList)) {
    // сделай кнопку неактивной
    makeDisableButton(buttonElement, enableValidation)
  } else {
    // иначе сделай кнопку активной
    removeDisableButton(buttonElement, enableValidation)
  }
}; 


// Функция принимает массив полей, проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита
function hasfalseInput(inputList) {
  // проходим по этому массиву методом some
  return inputList.some((textInput) => {
// Если поле не валидно, колбэк вернёт true
// Обход массива прекратится и вся функция hasInvalidInput вернёт true
    return !textInput.validity.valid;
  })
}; 


function makeDisableButton(element) {
  element.classList.add(enableValidation.inactiveButtonClass);
  element.setAttribute('disabled', true);
}

function removeDisableButton(element) {
  element.classList.remove(enableValidation.inactiveButtonClass);
  element.removeAttribute('disabled');
}
// Вызовем функцию
checkValidation(enableValidation); 