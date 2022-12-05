export default class UserInfo {
    constructor({name, personalInformation, avatar}) {
    this._name = document.querySelector(name);
    this._personalInformation = document.querySelector(personalInformation);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() { //возвращает return  объект {} с данными пользователя (имя, работа).
    return { // берем значения данных пользователя
      name: this._name.textContent,
      personalInformation: this._personalInformation.textContent,
    };
  }

  setUserInfo(name, personalInformation) {//принимает новые данные пользователя и добавляет их на страницу.
    this._name.textContent = name;
    this._personalInformation.textContent = personalInformation;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar
  }
}
