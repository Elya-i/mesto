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

  _request(url, options) {
    return fetch(url, options).then(this._checkServerResponse)
  }

  getCardList() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers
    })
  }

  getUserData() {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
  }

  sendUserData(userData) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: userData.name, about: userData.about})
    })
  }

  postNewCard({ name, link }) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
  }

  deleteCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  updateUserAvatar(userData) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: userData.avatar })
    })
  }

  likeCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
  }

  dislikeCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }
}

export { Api };