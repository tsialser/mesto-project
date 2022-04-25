import './pages/index.css';
import {
  elementsContainer,
  formCards,
  popupCards,
  addCardButton,
  btnEditProfile,
  formProfile,
  popup,
  popupProfile,
} from "./components/constants.js";

import { addCard, createCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  overlayClose,
} from "./components/modal.js";
import { enableValidation } from "./components/validate.js";
import { handleProfileSubmit, addFormValue } from "./components/utils.js";

// Открытие формы добавления карточек
addCardButton.addEventListener("click", () => {
  openPopup(popupCards);
});

// Открытие формы редактирования профиля
btnEditProfile.addEventListener("click", () => {
  addFormValue();
  openPopup(popupProfile);
});

// Прикрепляем обработчик к форме профиля:
formProfile.addEventListener("submit", handleProfileSubmit);

// Создаем карточку с изображением и прикрепляем к обработчику
formCards.addEventListener("submit", function (evt) {
  evt.preventDefault();

  addCard(
    elementsContainer,
    createCard(formCards.title.value, formCards.link.value)
  );
  formCards.reset();

  //setSubmitButtonCards(false);
  closePopup(popupCards);
});

// Закрытие попапов
popup.forEach((element) => {
  element.addEventListener("click", overlayClose);
});

//Валидация
enableValidation();
