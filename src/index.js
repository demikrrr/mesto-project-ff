import "./pages/index.css";

import { 
  createCard,
  likeCard,
  deleteCard,
  isMyLike
} from "./components/card.js";

import { 
  openPopup,
  closePopup,
  listenPopup
} from "./components/modal.js";

import { 
  enableValidation, 
  validationConfig, 
  clearValidation
} from "./components/validations.js";

import { 
  editAvatar,
  getInitialCards,
  getUserData,
  editUserData,
  addCard
} from "./components/api.js";

//константы

const placesList = document.querySelector('.places__list');
const profileAvatar = document.querySelector('.profile__image');
const popupAvatarForm = document.querySelector('.popup__form[name="avatar-change"]');
const popups = document.querySelectorAll('.popup');
const popupEditAvatar = document.querySelector('.popup_type_edit_avatar');
const popupAvatarButton = popupEditAvatar.querySelector('.popup__button');
const popupInputTypeUrl = popupEditAvatar.querySelector(".popup__input_type_url");
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditProfileButton = popupEditProfile.querySelector('.popup__button');
const popupEditProfileInputName = popupEditProfile.querySelector('.popup__input_type_name');
const popupEditProfileInputDescription = popupEditProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupAddNewCardButton = popupAddNewCard.querySelector('.popup__button');
const formElementProfile = document.forms['edit-profile'];
const formElementNewCard = document.forms['new-place'];
const namePlaceInput = formElementNewCard.querySelector('.popup__input_type_card-name');
const linkPlaceInput = formElementNewCard.querySelector('.popup__input_type_url');
const popupCard = document.querySelector('.popup_type_image');
const popupCardImage = popupCard.querySelector('.popup__image');
const popupCardCaption = popupCard.querySelector('.popup__caption');

//открытие модальных окон

document.querySelector('.profile__edit-button').addEventListener('click', function () {
  openPopup(popupEditProfile);
  popupEditProfileInputName.value = profileTitle.textContent;
  popupEditProfileInputDescription.value = profileDescription.textContent;
  clearValidation(formElementProfile, validationConfig);
});

document.querySelector('.profile__add-button').addEventListener('click', function () {
  openPopup(popupAddNewCard);
  clearValidation(formElementNewCard, validationConfig);
});

profileAvatar.addEventListener("click", () => {
  openPopup(popupEditAvatar);
  popupInputTypeUrl.value = profileAvatar.style.backgroundImage.replace(/url\(["']?(.*?)["']?\)/, "$1");
  clearValidation(popupAvatarForm, validationConfig);
});

//функция развертывания картинки

function openPopupImage (cardData) {
  openPopup(popupCard);
  popupCardImage.src = cardData.link;
  popupCardImage.alt = cardData.name;
  popupCardCaption.textContent = cardData.name;
}

//вызов "слушателя" на модальные окна

popups.forEach((popup) => {listenPopup(popup)});

//активация валидации полей ввода

enableValidation(validationConfig);

//загрузка информации с сервера

Promise.all([getUserData(), getInitialCards()])
  .then(([profileData, cardsData]) => {
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileAvatar.style.backgroundImage = `url(\\${profileData.avatar})`;

    cardsData.forEach((card) => {

      let cardHaveMyLike = '';
      if(isMyLike(card, profileData._id)) {
        cardHaveMyLike = 'true';
      } else {cardHaveMyLike = 'false'};

      const сardObject = {
        name: card.name,
        link: card.link,
        likeFunction: likeCard,
        deleteFunction: deleteCard,
        openImageFunction: openPopupImage,
        cardId: card._id,
        ownerId: card.owner._id,
        profileId: profileData._id,
        cardNumberLikes: card.likes.length,
        cardHaveMyLikeElement: cardHaveMyLike
      };
      placesList.append(createCard(сardObject));

    });
  })
  .catch((error) => console.log("данные не обработаны / promise:", error));

//обновление аватара пользователя

function changeAvatarFormSubmit(evt) {
  evt.preventDefault();
  const buttonText = popupAvatarButton.textContent;
  popupAvatarButton.textContent = "Сохранение...";
  editAvatar(popupInputTypeUrl.value)
    .then((Data) => {
      profileAvatar.style.backgroundImage = `url(\\${Data.avatar})`;
      closePopup(popupEditAvatar);
    })
    .catch((error) => console.log("Данные аватара не обработаны", error))
    .finally(() => (popupAvatarButton.textContent = buttonText));
  clearValidation(popupAvatarForm, validationConfig);
}

popupAvatarForm.addEventListener("submit", changeAvatarFormSubmit);

//редактирование профиля

function editProfilePopupSubmit(event) {
  event.preventDefault();
  const buttonText = popupEditProfileButton.textContent;
  popupEditProfileButton.textContent = "Сохранение...";

  editUserData(popupEditProfileInputName.value, popupEditProfileInputDescription.value)
    .then((profileData) => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
      closePopup(popupEditProfile);
    })
    .catch((error) => console.log("данные профиля не обработаны:", error))
    .finally(() => (popupEditProfileButton.textContent = buttonText));
  clearValidation(formElementProfile, validationConfig);
}

formElementProfile.addEventListener('submit', editProfilePopupSubmit);

//добавление карточки

function addNewCardSubmit(event) {
  event.preventDefault();
  const buttonText = popupAddNewCardButton.textContent;
  popupAddNewCardButton.textContent = "Сохранение...";

  addCard(namePlaceInput.value, linkPlaceInput.value)
    .then((card) => {
      console.log(card)
      const newCardObject = {
        name: card.name,
        link: card.link,
        likeFunction: likeCard,
        deleteFunction: deleteCard,
        openImageFunction: openPopupImage,
        cardId: card._id,
        ownerId: card.owner._id,
        profileId: card.owner._id,
        cardNumberLikes: card.likes.length,
        cardHaveMyLikeElement: 'false'
      };
      const newCard = createCard(newCardObject);
      placesList.prepend(newCard);
      closePopup(popupAddNewCard);
      formElementNewCard.reset();
    })
    .catch((error) => console.log("Данные карточки не обработаны:", error))
    .finally(() => (popupAddNewCardButton.textContent = buttonText));
  clearValidation(formElementNewCard, validationConfig);
};

formElementNewCard.addEventListener('submit', addNewCardSubmit);