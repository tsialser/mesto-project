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

import { createCard, handleCardSubmit } from "./components/card.js";
import {
  openPopup,
  overlayClose,
  reset,
} from "./components/modal.js";
import { enableValidation } from "./components/validate.js";
import { handleProfileSubmit, addFormValue } from "./components/utils.js";
import { getCards } from "./components/api.js"

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

// Прикрепляем обработчик к форме профиля:
formProfile.addEventListener("submit", handleProfileSubmit);

// Прикрепляем обработчик к форме карточки
formCards.addEventListener("submit", handleCardSubmit);

// Закрытие попапов
popups.forEach((element) => {
  element.addEventListener("click", overlayClose);
});

//Валидация
enableValidation(settings);

getCards()
.then((cards) => {
  cards.forEach(function(card) {
    const createdCard = createCard(
      card.link,
      card.name
    )
    elementsContainer.append(createdCard);
  })
})
  