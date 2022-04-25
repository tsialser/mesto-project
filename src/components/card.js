import {
  cardTemplate,
  initialCards,
  elementsContainer,
  openImgPopup,
} from "./constants.js";
import { openPopup } from "./modal.js";

// Создание карточки
export function createCard(titleValue, linkValue) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);

  cardElement.querySelector(".element__image").src = linkValue;
  cardElement.querySelector(".element__image").alt = titleValue;

  cardElement.querySelector(".element__title").textContent = titleValue;

  //Лайк
  cardElement
    .querySelector(".element__button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__button_active");
    });

  //Удаление
  cardElement
    .querySelector(".element__delete-button")
    .addEventListener("click", handleDeleteClick);

  //При клике на вновь созданную карточку открываем изображение
  cardElement.querySelector(".element__image").addEventListener("click", () => {
    popupImage(linkValue, titleValue);
  });

  return cardElement;
}

// Добавление карточек
export function addCard(container, cardElement) {
  container.prepend(cardElement);
}

// Функция удаления карточки
export function handleDeleteClick(evt) {
  evt.target.closest(".element").remove();
}

// 6 карточек из коробки
initialCards.forEach((card) => {
  addCard(elementsContainer, createCard(card.name, card.link));
});

// Функция открытия Изображения
function popupImage(linkImg, titleImg) {
  openPopup(openImgPopup);
  openImgPopup.querySelector(".popup__img").src = linkImg;
  openImgPopup.querySelector(".popup__img").alt = titleImg;
  openImgPopup.querySelector(".popup__title-img").textContent = titleImg;
}
