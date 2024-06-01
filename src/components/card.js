import { 
  cardTemplate,
  popupCard,
  popupCardImage,
  popupCardCaption
} from "../index.js";

import { 
  openPopup
} from "./modal.js";

// Функция создания карточки

export function createCard(cardData) {

  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardLikeButton = card.querySelector('.card__like-button');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardDeleteButton.addEventListener('click', deleteCard);
  cardLikeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', () => {openPopupImage(cardData)});

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

// Функция развертывания картинки

function openPopupImage (cardData) {
  openPopup(popupCard);
  popupCardImage.src = cardData.link;
  popupCardImage.alt = cardData.name;
  popupCardCaption.textContent = cardData.name;
}