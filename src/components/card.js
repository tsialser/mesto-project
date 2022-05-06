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
  profileTitle,
  profileSubtitle,
  profileAvatar,
  deleteCardButton,
} from "./constants.js";
import { openPopup, closePopup } from "./modal.js";
import {
  addNewCard,
  likeCard,
  unlikeCard,
  deleteCard,
  getUserInformation,
  getCards,
} from "./api.js";

let cardToDelete = {};

export function handleCardSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение..";

  addNewCard({
    link: link.value,
    name: title.value,
  })
    .then((data) => {
      const card = createCard(
        data.link,
        data.name,
        data._id,
        data.likes.length
      );
      closePopup(popupCards);
      elementsContainer.prepend(card);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      evt.submitter.textContent = "Создать";
    });
}

// Создание карточки
export function createCard(
  link,
  title,
  cardId,
  likes,
  cardOwnerId,
  userId,
  cardLikes = []
) {
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

  // Like/Unlike
  cardLike.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("element__button_active")) {
      unlikeCard(cardId)
        .then((data) => {
          cardLike.classList.remove("element__button_active");
          cardCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      likeCard(cardId)
        .then((data) => {
          cardLike.classList.add("element__button_active");
          cardCount.textContent = data.likes.length;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });

  // Проверяем, мы ли нажали на лайк
  function checkLike(like) {
    return like._id === userId;
  }

  function filter(checkedLike) {
    const filterCardLiked = cardLikes.some(checkedLike);

    if (filterCardLiked) {
      cardLike.classList.add("element__button_active");
    }
  }

  filter(checkLike);

  //Удаление
  iconDelete.addEventListener("click", function () {
    openPopup(popupDelete);
    cardToDelete = { cardElement, cardId };
  });

  if (cardOwnerId !== userId) {
    iconDelete.classList.add("element__delete-button_type_disabled");
  }

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

Promise.all([getUserInformation(), getCards()])
  .then(([user, cards]) => {
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
        user._id,
        card.likes
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
