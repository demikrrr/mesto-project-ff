import "./pages/index.css";

import { 
  createCard
} from "./components/card.js";

import { 
  openPopup,
  closePopup,
  listenPopup
} from "./components/modal.js";

export {
  cardTemplate,
  placesList,
  popupCard,
  popupCardImage,
  popupCardCaption
}

// Константы

const cardTemplate = document.querySelector('#card-template').content; 
const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditProfileInputName = popupEditProfile.querySelector('.popup__input_type_name');
const popupEditProfileInputDescription = popupEditProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const formElementProfile = document.forms['edit-profile'];
const formElementNewCard = document.forms['new-place'];
const namePlaceInput = formElementNewCard.querySelector('.popup__input_type_card-name');
const linkPlaceInput = formElementNewCard.querySelector('.popup__input_type_url');
const popupCard = document.querySelector('.popup_type_image');
const popupCardImage = popupCard.querySelector('.popup__image');
const popupCardCaption = popupCard.querySelector('.popup__caption');

// Открытие модальных окон

document.querySelector('.profile__edit-button').addEventListener('click', function () {
  openPopup(popupEditProfile);
  popupEditProfileInputName.value = profileTitle.textContent;
  popupEditProfileInputDescription.value = profileDescription.textContent;
});

document.querySelector('.profile__add-button').addEventListener('click', function () {
  openPopup(popupAddNewCard);
});

// Вызов "слушателя" на модальные окна

popups.forEach(function (popup) {
  listenPopup(popup);
});

// Редактирования профиля

function editProfilePopupSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = popupEditProfileInputName.value;
  profileDescription.textContent = popupEditProfileInputDescription.value;
  closePopup(popupEditProfile);
}

formElementProfile.addEventListener('submit', editProfilePopupSubmit);

// Добавление карточки

function addNewCardSubmit(event) {
  event.preventDefault();
  const newCardObject = {
    name: namePlaceInput.value,
    link: linkPlaceInput.value
  };
  placesList.prepend(createCard(newCardObject));
  closePopup(popupAddNewCard);
  formElementNewCard.reset();
}

formElementNewCard.addEventListener('submit', addNewCardSubmit);

// Наполнение страницы контентом

import {initialCards} from './components/cards.js';

initialCards.forEach(function (item) {
  placesList.append(createCard(item));
});