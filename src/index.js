import "./pages/index.css";

import { 
  createCard,
  deleteCard,
  likeCard
} from "./components/card.js";

import { 
  openPopup,
  closePopup,
  listenPopup
} from "./components/modal.js";

const placesList = document.querySelector('.places__list');

// Открытие/закрытие модальных окон

const popupEditProfile = document.querySelector('.popup_type_edit');
document.querySelector('.profile__edit-button').addEventListener('click', function () {
  openPopup(popupEditProfile);
  popupEditProfile.querySelector('.popup__input_type_name').value = document.querySelector('.profile__title').textContent;
  popupEditProfile.querySelector('.popup__input_type_description').value = document.querySelector('.profile__description').textContent;
  listenPopup(popupEditProfile);
});

const popupAddNewCard = document.querySelector('.popup_type_new-card');
document.querySelector('.profile__add-button').addEventListener('click', function () {
  openPopup(popupAddNewCard);
  listenPopup(popupAddNewCard);
});

const popupImage = document.querySelector('.popup_type_image');
placesList.addEventListener('click', function (event) {
  const activeCard = event.target.closest('.card');
  if (!event.target.classList.contains('card__delete-button') && !event.target.classList.contains('card__like-button')) {
    openPopup(popupImage);
    popupImage.querySelector('.popup__image').src = activeCard.querySelector('.card__image').src;
    popupImage.querySelector('.popup__image').alt = activeCard.querySelector('.card__image').alt;
    popupImage.querySelector('.popup__caption').textContent = activeCard.querySelector('.card__title').textContent;
    listenPopup(popupImage);
  };
});

// Редактирования профиля

const formElementProfile = document.forms['edit-profile'];
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_description');

function handleFormSubmit(event) {
  event.preventDefault();
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formElementProfile.addEventListener('submit', handleFormSubmit);

// Добавление карточки

const formElementNewCard = document.forms['new-place'];
const namePlaceInput = formElementNewCard.querySelector('.popup__input_type_card-name');
const linkPlaceInput = formElementNewCard.querySelector('.popup__input_type_url');

function addNewCardSubmit(event) {
  event.preventDefault();
  placesList.prepend(createCard(namePlaceInput.value, linkPlaceInput.value, deleteCard, likeCard));
  closePopup(popupAddNewCard);
  formElementNewCard.reset();
}

formElementNewCard.addEventListener('submit', addNewCardSubmit);

// Наполнение страницы контентом

import {initialCards} from './components/cards.js';

initialCards.forEach(function (item) {
  placesList.append(createCard(item.name, item.link, deleteCard, likeCard));
});