import { key } from "./constants.js";

// Функции открытия-закрытия самого модального окна
export function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", escClose);
}

export function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", escClose);
}

// Функция закрытия по нажатию на Esc
function escClose(evt) {
  if (evt.key === key) {
    const openPopup = document.querySelector(".popup_opened");
    closePopup(openPopup);
  }
}

// Функция закрытия по клику на Оверлей и кнопке закрыть
export function overlayClose(evt) {
  const overlay = evt.target.classList.contains("popup");
  const closeButton = evt.target.classList.contains("popup__close-button");
  if (overlay || closeButton) {
    closePopup(evt.currentTarget);
  }
}
