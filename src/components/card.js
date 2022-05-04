import {
  title,
  link,
  formCards,
  popupCards,
  cardTemplate,
  initialCards,
  elementsContainer,
  openImgPopup,
  popupImg,
  popupImgTitle
} from "./constants.js";
import { openPopup, closePopup } from "./modal.js";
import { getCards, addNewCard } from "./api.js";

export function handleCardSubmit(evt) {
  evt.preventDefault();
/*
  addCard(
    elementsContainer,
    createCard(formCards.title.value, formCards.link.value)
  );*/
  addNewCard({
    name: title.value,
    link: link.value
  })
    .then((data) => {
      const card = createCard(
        data.name,
        data.link
      )
      closePopup(popupCards);
    })
}




// Создание карточки
export function createCard(name, link) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector(".element__title");

  cardImage.src = link.value;
  cardImage.textContent = name.value;
  cardTitle.textContent = name.value;


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
