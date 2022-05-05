import "./pages/index.css";

import {
  settings,
  elementsContainer,
  formCards,
  popupCards,
  profileAvatar,
  profileTitle,
  profileSubtitle,
  addCardButton,
  deleteCardButton,
  btnEditProfile,
  formProfile,
  popups,
  popupProfile,
  popupDelete,
} from "./components/constants.js";

import {
  createCard,
  handleCardSubmit,
  cardToDelete,
  addCard,
} from "./components/card.js";
import {
  closePopup,
  openPopup,
  overlayClose,
  reset,
} from "./components/modal.js";
import { enableValidation } from "./components/validate.js";
import { handleProfileSubmit, addFormValue } from "./components/utils.js";
import { getCards, deleteCard, getUserInformation } from "./components/api.js";

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

Promise.all([getUserInformation(), getCards()])
  .then(([user, cards]) => {
    //userId = user._id;
    profileTitle.textContent = user.name;
    profileSubtitle.textContent = user.about;
    profileAvatar.src = user.avatar;
    profileAvatar.alt = `Аватар ${user.name}`;
    cards.forEach((card) => {
      const initialCards = createCard(
        card.link,
        card.name,
        card._id,
        card.likes.length,
        card.owner._id,
        user._id
      );
      addCard(elementsContainer, initialCards);
    });
  })
  .catch((err) => {
    console.error(err);
  });

deleteCardButton.addEventListener("click", () => {
  deleteCard(cardToDelete.cardId)
    .then(() => {
      cardToDelete.cardElement.remove();
      closePopup(popupDelete);
    })
    .catch((err) => {
      console.error(err);
    });
});
