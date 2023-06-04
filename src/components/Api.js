class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkServerResponse(response) {
    if (response.ok) {
      return response.json();
    }
    else {
      return Promise.reject(`Ошибка: ${response.status}`)
    } 
  };

  getCardList() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
    .then(response => { return this._checkServerResponse(response); })
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      else {
      return Promise.reject(`Ошибка: ${response.status}`)}
    })
  }

  sendUserData(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: name, about: about })
    })
      .then(response => { return this._checkServerResponse(response); })
  }

  postNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
      .then(response => { return this._checkServerResponse(response); })
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(response => { return this._checkServerResponse(response); })
  }

  updateUserAvatar(avatarLink) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: avatarLink })
    })
      .then(response => { return this._checkServerResponse(response); })
  }
 
  like(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(response => { return this._checkServerResponse(response); })
  }

  dislike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(response => { return this._checkServerResponse(response); })
  }

}

export { Api };