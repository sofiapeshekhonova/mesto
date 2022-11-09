export default class UserInfo {
  //объект {} с селекторами двух имени пользователя и элемента информации о себе.
  constructor({name, personalInformation}) {
    this._name = document.querySelector(name);
    this._personalInformation = document.querySelector(personalInformation);
  }

  getUserInfo() {
    //возвращает return  объект {} с данными пользователя (имя, работа).
    return {
      // берем значения данных пользователя
      name: this._name.textContent,
      personalInformation: this._personalInformation.textContent,
    };
  }

  setUserInfo(name, personalInformation) {
    //принимает новые данные пользователя и добавляет их на страницу.
    this._name.textContent = name;
    this._personalInformation.textContent = personalInformation;
  }
}
