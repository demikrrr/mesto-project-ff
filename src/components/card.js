// Функция создания карточки

export function createCard(name, link, deleteCard, likeCard) {
  const cardTemplate = document.querySelector('#card-template').content; 
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = name;
  card.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  card.querySelector('.card__like-button').addEventListener('click', likeCard);
  return card;
};

// Функция удаления карточки

export function deleteCard(event) {
  const placeDelete = event.target.closest('.card');
  placeDelete.remove();
};

// Функция лайка карточки

export function likeCard (event) {
  if (event.target.classList.contains('card__like-button')) {
    event.target.classList.toggle('card__like-button_is-active');
  };
};

