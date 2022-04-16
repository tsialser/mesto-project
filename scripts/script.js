const popup = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(".popup_type_profile");
const popupCards = document.querySelector(".popup_type_cards");
const openImgPopup = document.querySelector(".popup_type_image");
const btnEditProfile = document.querySelector(".profile__edit-button");
const closeButtonProfile = document.querySelector("#close-button-profile");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const addCardButton = document.querySelector(".profile__add-button");
const closeCardButton = document.querySelector("#close-button-cards");
const formProfile = document.querySelector("#form-profile");
const formCards = document.querySelector("#form-cards");
const title = document.querySelector("#title");
const link = document.querySelector("#link");
const nameInput = formProfile.querySelector("#name");
const jobInput = formProfile.querySelector("#job");
const cardTemplate = document.querySelector("#card-template").content;
const closeImgPopup = document.querySelector("#close-button-img");
const main = document.querySelector(".main");
const elementsContainer = main.querySelector(".elements");
const key = "Escape";

// Функции открытия-закрытия самого модального окна
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", escClose);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydowm", escClose);
}

// Функция закрытия по нажатию на Esc
function escClose(evt) {
  if (evt.key === key) {
    const openPopup = document.querySelector(".popup_opened");
    closePopup(openPopup);
  }
}

// Функция закрытия по клику на Оверлей и кнопке закрыть
function overlayClose(evt) {
  const overlay = evt.target.classList.contains("popup");
  const closeButton = evt.target.classList.contains("popup__close-button");
  if (overlay || closeButton) {
    closePopup(evt.currentTarget);
  }
}

// Функция добавления информации в попап профиля
function addFormValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

// Обработчик «отправки» формы редактирования профиля
function handleProfileSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(popupProfile);
}

// Функция удаления карточки
handleDeleteClick = (evt) => {
  evt.target.closest(".element").remove();
};

// Создание карточки
function createCard(titleValue, linkValue) {
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
function addCard(container, cardElement) {
  container.prepend(cardElement);
}

// Функция открытия Изображения
function popupImage(linkImg, titleImg) {
  openPopup(openImgPopup);
  openImgPopup.querySelector(".popup__img").src = linkImg;
  openImgPopup.querySelector(".popup__img").alt = titleImg;
  openImgPopup.querySelector(".popup__title-img").textContent = titleImg;
}

//Открытие формы добавления карточек
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

  closePopup(popupCards);
});

// 6 карточек из коробки
initialCards.forEach((card) => {
  addCard(elementsContainer, createCard(card.name, card.link));
});

// Закрытие попапов
popup.forEach((element) => {
  element.addEventListener("click", overlayClose);
});

