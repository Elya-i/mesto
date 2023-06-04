class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._templateContainer = document.querySelector(containerSelector);
  }

  renderItems(array) {
    array.forEach((item) => this._renderer(item))
  }

  appendItem(element) {
    this._templateContainer.append(element);
  }

  prependItem(element) {
    this._templateContainer.prepend(element);
  }
}

export { Section };