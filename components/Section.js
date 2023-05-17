class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._templateContainer = document.querySelector(containerSelector);
  }

  /** Метод создания и отрисовки данных на странице */
  renderItems() {
    this._items.forEach((item)=>this._renderer(item))
  }

  /**  Метод, принимающий DOM-элемент и добавляющий его в контейнер */
  addItem(element) {
    this._templateContainer.prepend(element);
  }
}

export { Section };