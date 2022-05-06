import { key, settings } from "./constants.js";
import { toggleButtonState } from "./validate.js";

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

// Сброс
function setbuttonState(form) {
  const submitButton = form.querySelector(settings.submitButton);
  const inputList = Array.from(form.querySelectorAll(settings.formInput));
  toggleButtonState(inputList, submitButton, settings);
}

export function reset(form) {
  form.reset();
  setbuttonState(form);
}
