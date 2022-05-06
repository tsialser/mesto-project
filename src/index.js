import "./pages/index.css";

import {
  settings,
  formCards,
  popupCards,
  addCardButton,
  btnEditProfile,
  formProfile,
  popups,
  popupProfile,
  editAvatar,
  formEditAvatar,
  popupEditAvatar,
} from "./components/constants.js";

import { handleCardSubmit } from "./components/card.js";
import { openPopup, overlayClose, reset } from "./components/modal.js";
import { enableValidation } from "./components/validate.js";
import {
  handleProfileSubmit,
  addFormValue,
  handleAvatarSubmit,
} from "./components/utils.js";

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

// Открытие формы редактирования аватара
editAvatar.addEventListener("click", () => {
  reset(formEditAvatar);
  openPopup(popupEditAvatar);
});

// Прикрепляем обработчик к форме профиля:
formProfile.addEventListener("submit", handleProfileSubmit);

// Прикрепляем обработчик к форме карточки
formCards.addEventListener("submit", handleCardSubmit);

// Прикрепляем обработчик к форме смены автара
formEditAvatar.addEventListener("submit", handleAvatarSubmit);

// Закрытие попапов
popups.forEach((element) => {
  element.addEventListener("click", overlayClose);
});

//Валидация
enableValidation(settings);
