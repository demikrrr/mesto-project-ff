import { initialCards } from './cards.js'
import "./pages/index.css";


// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content; 

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');
const placesItem = cardTemplate.querySelector('.places__item');

// @todo: Функция создания карточки

function createCard(name, link, cardDelete, openPopupImage, likeCard) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = name;
  card.querySelector('.card__delete-button').addEventListener('click', cardDelete);
  openPopupImage ();
  card.querySelector('.card__like-button').addEventListener('click', likeCard);
  return card;
};

// @todo: Функция удаления карточки

function deletePlace(event) {
  const placeDelete = event.target.closest('.card');
  placeDelete.remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
  placesList.append(createCard(item.name, item.link, deletePlace, openPopupImage, likeCard));
});

// @todo: Функция открытия модального окна

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
};

// @todo: Функция закрытия модального окна

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
};

// @todo: Функция отслеживания событий при открытом модальном окне

function listenPopup(popup) {
  popup.querySelector('.popup__close').addEventListener('click', function () {
    closePopup(popup);
  });
  popup.addEventListener("click", function (event) {
    if (event.currentTarget === event.target) {
      closePopup(popup);
    };
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") {
      closePopup(popup);
    };
  }); 
};

// @todo: Открытие/закрытие модальных окон

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

function openPopupImage () {
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
};

// @todo: Функция лайка карточки

function likeCard (event) {
  if (event.target.classList.contains('card__like-button')) {
    event.target.classList.toggle('card__like-button_is-active');
  };
};

// @todo: Редактирования профиля

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

// @todo: Добавление карточки

const formElementNewCard = document.forms['new-place'];
const namePlaceInput = formElementNewCard.querySelector('.popup__input_type_card-name');
const linkPlaceInput = formElementNewCard.querySelector('.popup__input_type_url');

function addNewCardSubmit(event) {
  event.preventDefault();
  placesList.prepend(createCard(namePlaceInput.value, linkPlaceInput.value, deletePlace, openPopupImage, likeCard));
  closePopup(popupAddNewCard);
  formElementNewCard.reset();
}

formElementNewCard.addEventListener('submit', addNewCardSubmit);