import {
  cardTemplate,
  initialCards,
  elementsContainer,
  openImgPopup,
  popupImg,
  popupImgTitle
} from "./constants.js";
import { openPopup } from "./modal.js";


// Создание карточки
export function createCard(link, name,) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');

  cardImage.src = link;
  cardImage.alt = name;

  cardElement.querySelector(".element__title").textContent = name;

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
  cardImage.addEventListener("click", () => {
    popupImage(link, name);
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
/*
// 6 карточек из коробки
initialCards.forEach((card) => {
  addCard(elementsContainer, createCard(card.name, card.link));
});
*/

// Функция открытия Изображения
function popupImage(linkImg, titleImg) {
  openPopup(openImgPopup);
  popupImg.src = linkImg;
  popupImg.alt = titleImg;
  popupImgTitle.textContent = titleImg;
}
