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

  if(isMyLike(cardData.likesArray, cardData.profileId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  };//закрасить кнопку лайка на пролайканных карточках

  card.dataset.cardId = cardData.cardId;
  card.dataset.ownerId = cardData.ownerId;

  if(card.dataset.ownerId !== cardData.profileId) {
    cardDeleteButton.remove(); //заблокировать кнопку удаления на карточках созданных другим пользователем
  } else {
    cardDeleteButton.addEventListener('click', cardData.deleteFunction)
  };

  cardLikeButton.addEventListener('click', cardData.likeFunction);
  cardImage.addEventListener('click', () => {cardData.openImageFunction(cardData)});

  return card;
};

//функция удаления карточки

export function deleteCard(event) {
  const placeDelete = event.target.closest('.card');
  requestDeleteCard(placeDelete.dataset.cardId)
    .then(placeDelete.remove())
    .catch((err) => console.log("Карта не удалена", err));
};

//функция лайка карточки

export function likeCard (event) {
  const card = event.target.closest('.card');
  const cardNumberOfLikes = card.querySelector('.card__number-likes');
  const likeMethod = event.target.classList.contains('card__like-button_is-active') ? sendDeleteLikeCard : sendAddLikeCard;
  likeMethod(card.dataset.cardId)
    .then((data) => {
      cardNumberOfLikes.textContent = data.likes.length; 
      event.target.classList.toggle('card__like-button_is-active'); 
    })
    .catch((err) => console.log("Количество лайков не определено", err));
};

//функция проверки наличия лайка пользователя на карточке

function isMyLike(likesArray, profileId) {
  return likesArray.some((item) => item._id === profileId);
};