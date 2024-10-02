import { 
  requestDeleteCard,
  sendAddLikeCard,
  sendDeleteLikeCard
} from "./api.js";

//константы

const cardTemplate = document.querySelector('#card-template').content;

//функция создания карточки

export function createCard(cardData) {

  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardNumberOfLikes = card.querySelector('.card__number-likes');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardNumberOfLikes.textContent = cardData.cardNumberLikes;//показать количество лайков на карточке

  if(cardData.cardHaveMyLikeElement === 'true') {
    cardLikeButton.classList.add('card__like-button_is-active');
  };//закрасить кнопку лайка на пролайканных карточках

  card.dataset.cardId = cardData.cardId;
  card.dataset.ownerId = cardData.ownerId;

  if(card.dataset.ownerId !== cardData.profileId) {
    cardDeleteButton.remove();
  };//заблокировать кнопку удаления на карточках созданных другим пользователем

  cardDeleteButton.addEventListener('click', cardData.deleteFunction);
  cardLikeButton.addEventListener('click', cardData.likeFunction);
  cardImage.addEventListener('click', () => {cardData.openImageFunction(cardData)});

  return card;
};

//функция удаления карточки

export function deleteCard(event) {
  const placeDelete = event.target.closest('.card');
  requestDeleteCard(placeDelete.dataset.cardId);
  placeDelete.remove();
};

//функция лайка карточки

export function likeCard (event) {
  if (event.target.classList.contains('card__like-button')) {
    let card = event.target.closest('.card');
    let cardNumberOfLikes = card.querySelector('.card__number-likes');
    if(event.target.classList.contains('card__like-button_is-active')) {
      sendDeleteLikeCard(card.dataset.cardId)
        .then((data) => {
          cardNumberOfLikes.textContent = data.likes.length;
        });
    } else {
        sendAddLikeCard(card.dataset.cardId)
          .then((data) => {
            cardNumberOfLikes.textContent = data.likes.length;
          });
    };
    event.target.classList.toggle('card__like-button_is-active');
  };
};

//функция проверки наличия лайка пользователя на карточке

export function isMyLike(cardData, profileId) {
  return cardData.likes.some((item) => item._id === profileId);
}