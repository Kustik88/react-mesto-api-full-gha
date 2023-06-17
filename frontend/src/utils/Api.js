class Api {
  constructor(basePath, token) {
    this._basePath = basePath
    this._token = token
  }

  _request(url, options) {
    return fetch(url, options).then(this._getJson)
  }

  _getHeaders() {
    return {
      'Content-Type': 'application/json',
      authorization: this._token
    }
  }

  _getJson(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
  }

  getCurrentUser() {
    return this._request(`${this._basePath}/users/me`, {
      method: 'GET',
      headers: this._getHeaders()
    })
  }

  editUserInfo(data) {
    return this._request(`${this._basePath}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  getCards() {
    return this._request(`${this._basePath}/cards`, {
      method: 'GET',
      headers: this._getHeaders()
    })
  }

  addCard(dataCard) {
    return this._request(`${this._basePath}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: dataCard.name,
        link: dataCard.link
      })
    })
  }

  deleteCard(cardId) {
    return this._request(`${this._basePath}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
  }

  likeCard(dataCardId) {
    return this._request(`${this._basePath}/cards/${dataCardId}/likes`, {
      method: 'PUT',
      headers: this._getHeaders(),
    })
  }

  unlikeCard(dataCardId) {
    return this._request(`${this._basePath}/cards/${dataCardId}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
  }

  getCardsInfo() {
    return this._request(`${this._basePath}/cards/`, {
      method: 'GET',
      headers: this._getHeaders(),
    })
  }

  editAvatarProfile(urlAvatar) {
    return this._request(`${this._basePath}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: urlAvatar
      })
    })
  }
}

const api = new Api(
  'https://nomoreparties.co/v1/cohort-61',
  '691fb0ad-da89-4356-9015-af40e9b402a2'
)

export default api
