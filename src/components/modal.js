// Функция открытия модального окна

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
};

// Функция закрытия модального окна

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
};

// Функция отслеживания событий при открытом модальном окне

export function listenPopup(popup) {
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