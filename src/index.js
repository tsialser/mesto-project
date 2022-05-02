import "./pages/index.css";

import {
  settings,
  elementsContainer,
  formCards,
  popupCards,
  addCardButton,
  btnEditProfile,
  formProfile,
  popups,
  popupProfile,
} from "./components/constants.js";

import { addCard, createCard, loadProjects } from "./components/card.js";
import {
  openPopup,
  closePopup,
  overlayClose,
  reset,
} from "./components/modal.js";
import { enableValidation } from "./components/validate.js";
import { handleProfileSubmit, addFormValue } from "./components/utils.js";

// Открытие формы добавления карточек
addCardButton.addEventListener("click", () => {
  reset(formCards);
  openPopup(popupCards);
});

// Открытие формы редактирования профиля
btnEditProfile.addEventListener("click", () => {
  reset(formProfile);
  addFormValue();
  openPopup(popupProfile);
});
/*
// Прикрепляем обработчик к форме профиля:
formProfile.addEventListener("submit", handleProfileSubmit);
*/
// Создаем карточку с изображением и прикрепляем к обработчику
formCards.addEventListener("submit", function (evt) {
  evt.preventDefault();

  addCard(
    elementsContainer,
    createCard(formCards.title.value, formCards.link.value)
  );
  closePopup(popupCards);
});

// Закрытие попапов
popups.forEach((element) => {
  element.addEventListener("click", overlayClose);
});

//Валидация
enableValidation(settings);

