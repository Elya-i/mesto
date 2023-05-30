class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  /** Обработка ответа с сервера */
  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    else {
      return Promise.reject(`Ошибка: ${res.status}`)
    } 
  };

  /** Запрос карточек с сервера */
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
    .then(res => { return this._checkServerResponse(res); })
  }

  /** Загрузка информации о пользователе с сервера */
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      else {
      return Promise.reject(`Ошибка: ${res.status}`)}
    })
  }

  /** Отправка данных пользователя на сервер */
  sendUserData(userData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: userData.name, about: userData.about })
    })
      .then(res => { return this._checkServerResponse(res); })
  }

  // Добавление новой карточки на сервер
  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
      .then(res => { return this._checkServerResponse(res); })
  }

  // Удаление карточки с сервера
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => { return this._checkServerResponse(res); })
  }

  // Метод отправки данных о новом аватаре на сервер
  sendAvatarData(avatarLink) {
    return fetch(`${this._url}users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar: avatarLink.avatar })
    })
      .then(res => { return this._checkServerResponse(res); })
  }
  // Метод отправки лайка на сервер
  likeCard(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT',
    })
      .then(res => { return this._checkServerResponse(res); })
  }
  // Метод удаления лайка с сервера
  deletelikeCard(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then(res => { return this._checkServerResponse(res); })
  }

}

export { Api };