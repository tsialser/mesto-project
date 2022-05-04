import {
  title,
  link,
  popupCards,
  cardTemplate,
  elementsContainer,
  openImgPopup,
  popupImg,
  popupImgTitle
} from "./constants.js";
import { openPopup, closePopup } from "./modal.js";
import { addNewCard } from "./api.js";

export function handleCardSubmit(evt) {
  evt.preventDefault();

    addNewCard({
      link: link.value,
      name: title.value,
      
    })
      .then((data) => {
        const card = createCard(
          data.link,
          data.name,
        );
        closePopup(popupCards);
        elementsContainer.prepend(card);
      })
      .catch((err) => {
        console.error(err);
      })
    }

// Создание карточки
export function createCard(link, title, likes = []) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector(".element__title");
  const cardLike = cardElement.querySelector(".element__button");
  const cardCount = cardElement.querySelector(".element__like-count");
  let count = 0;

  cardImage.src = link;
  cardImage.alt = title;
  cardTitle.textContent = title;
  cardCount.textContent = likes;

  //Лайк
    cardLike.addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__button_active");
    });


  //Удаление
  cardElement
    .querySelector(".element__delete-button")
    .addEventListener("click", handleDeleteClick);

  //При клике на вновь созданную карточку открываем изображение
  cardImage.addEventListener("click", () => {
    popupImage(link, title);
  });

  return cardElement;
}

// Функция удаления карточки
function handleDeleteClick(evt) {
  evt.target.closest(".element").remove();
}

// Функция открытия Изображения
function popupImage(linkImg, titleImg) {
  openPopup(openImgPopup);
  popupImg.src = linkImg;
  popupImg.alt = titleImg;
  popupImgTitle.textContent = titleImg;
}
