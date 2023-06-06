class api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers,
    });
  }

  getUser() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
    });
  }

  editProfileAvatar(link) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }

  editProfile(title, subtitle) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        about: subtitle,
      }),
    });
  }
  postNewElement(name, link) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteMyElement(elementId) {
    return this._request(`${this._url}/cards/${elementId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
  putLike(elementId) {
    return this._request(`${this._url}/cards/likes/${elementId}`, {
      method: "PUT",
      headers: this._headers,
    });
  }
  unputLike(elementId) {
    return this._request(`${this._url}/cards/likes/${elementId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
  changeLikeCardStatus(elementId, isLiked) {
    return this._request(`${this._url}/cards/likes/${elementId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    });
  }
};


const Api = new api({
  url: "https://nomoreparties.co/v1/cohort-65",
  headers: {
    authorization: "b5da10d2-7cb8-4713-b3ad-0ef036c961ab",
    "Content-Type": "application/json",
  }
}); 

export default Api;