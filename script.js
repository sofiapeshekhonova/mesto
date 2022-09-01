
let container = document.querySelector('.content');
let openPopup = container.querySelector('.profile__information-button');
let closeButton = container.querySelector('.popup__icon');
let popup = container.querySelector('.popup');
let formElement = container.querySelector('.form');
let nameInput = container.querySelector('.popup_name');
let jobInput = container.querySelector('.popup_job');
let saveButton = container.querySelector('.popup__save');
let profilename = document.querySelector('.profile__information-name');
let profilejob = document.querySelector('.profile__information-job');

function showClick() {
  popup.classList.add('popup_opened');
}

openPopup.addEventListener('click', showClick); 

function closeClick() {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closeClick); 
saveButton.addEventListener('click', closeClick);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
// или так const formSubmitHandler = (event) => {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
    const name = nameInput.value;
    const job = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    profilename.textContent = name; // Вставьте новые значения с помощью textContent
    profilejob.textContent = job;   
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);