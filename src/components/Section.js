export default class Section {
  //items — это массив c карточками.renderer — это функция(создание и отрисовку данных на странице)//кконтейнер, в который нужно добавлять созданные элементы.
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems() {
    //Отрисовка каждого отдельного элемента
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    //принимает DOM-элемент и добавляет его в контейнер.
    this._container.prepend(element);
  }
}
