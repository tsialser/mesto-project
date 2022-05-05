import {
  title,
  link,
  popupCards,
  popupDelete,
  cardTemplate,
  elementsContainer,
  openImgPopup,
  popupImg,
  popupImgTitle,
} from "./constants.js";
import { openPopup, closePopup } from "./modal.js";
import { addNewCard } from "./api.js";

export let cardToDelete = {};

export function handleCardSubmit(evt) {
  evt.preventDefault();

  addNewCard({
    link: link.value,
    name: title.value,
  })
    .then((data) => {
      const card = createCard(data.link, data.name, data._id);
      closePopup(popupCards);
      elementsContainer.prepend(card);
    })
    .catch((err) => {
      console.error(err);
    });
}

// Создание карточки
export function createCard(link, title, cardId, likes, cardOwnerID, userId) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardImage = cardElement.querySelector(".element__image");
  const cardTitle = cardElement.querySelector(".element__title");
  const cardLike = cardElement.querySelector(".element__button");
  const cardCount = cardElement.querySelector(".element__like-count");
  const iconDelete = cardElement.querySelector(".element__delete-button");

  cardImage.src = link;
  cardImage.alt = title;
  cardTitle.textContent = title;
  cardCount.textContent = likes;

  //Лайк
  cardLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__button_active");
  });

  if (cardOwnerID !== userId) {
    iconDelete.classList.add("element__delete-button_type_disabled");
  }

  //Удаление

  iconDelete.addEventListener("click", function () {
    openPopup(popupDelete);
    cardToDelete = { cardElement, cardId };
  });

  //При клике на вновь созданную карточку открываем изображение
  cardImage.addEventListener("click", () => {
    popupImage(link, title);
  });
  return cardElement;
}

export function addCard(container, cardElement) {
  container.append(cardElement);
}

// Функция открытия Изображения
function popupImage(linkImg, titleImg) {
  openPopup(openImgPopup);
  popupImg.src = linkImg;
  popupImg.alt = titleImg;
  popupImgTitle.textContent = titleImg;
}
