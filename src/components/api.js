const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-23",
  headers: {
    authorization: "e0c77f4a-c67f-4470-b4d1-a243467c5352",
    "Content-Type": "application/json",
  },
};



//функция проверки ответа от сервера

function checkData(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
};

//функция изменения аватара пользователя

function editAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({avatar}),
  })
  .then((res) => checkData(res));
};

//функция загрузки информации о пользователе с сервера

const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then((res) => checkData(res));
};

//функция загрузки карточек с сервера

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then((res) => checkData(res));
};

//функция редактирования профиля

const editUserData = (profileTitle, profileDescription) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileTitle,
      about: profileDescription,
    }),
  }).then((res) => checkData(res));
};

//функция добавление карточки

function addCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => checkData(res));
};

//функция удаления карточки с сервера

function requestDeleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then((res) => checkData(res))
}

export {
  editAvatar,
  getInitialCards,
  getUserData,
  editUserData,
  addCard,
  requestDeleteCard
};