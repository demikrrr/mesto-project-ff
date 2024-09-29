//функция открытия модального окна

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
};

//функция закрытия модального окна

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
};

//функция закрытия модального окна при нажатии "ESC"

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

//функция отслеживания событий при открытом модальном окне

export function listenPopup(popup) {
  popup.querySelector('.popup__close').addEventListener('click', function () {
    closePopup(popup);
  });
  popup.addEventListener("click", function (event) {
    if (event.currentTarget === event.target) {
      closePopup(popup);
    };
  });
};