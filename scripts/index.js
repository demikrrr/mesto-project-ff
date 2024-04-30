// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const placesItem = cardTemplate.querySelector('.places__item');

// @todo: Функция создания карточки
function createCard(name, link, cardDelete) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = name;
  card.querySelector('.card__delete-button').addEventListener('click', cardDelete);

  return card;
}

// @todo: Функция удаления карточки
function deletePlace(event) {
  const placeDelete = event.target.closest('.card');
  placeDelete.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  placesList.append(createCard(item.name, item.link, deletePlace))
});