const popupElement = document.querySelector(".popup");
const popupProfile = document.querySelector(".popup__profile");
const popupCards = document.querySelector(".popup__cards");
const editProfileButton = document.querySelector(".profile__edit-button");
const closeButtonProfile = document.querySelector("#close-button-profile");
const addCardButton = document.querySelector(".profile__add-button");
const closeCardButton = document.querySelector("#close-button-cards");
const formElement = document.querySelector("#form-profile");
const formCards = document.querySelector("#form-cards");
const nameInput = formElement.querySelector("#name");
const jobInput = formElement.querySelector("#job");
const cardTemplate = document.querySelector("#card-template").content;

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//---------------------------------------------------Работа модальных окон------------------------------------------------

// Функции открытия-закрытия самого модального окна
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

// Открытие-Закрытие формы редактирования профиля
editProfileButton.addEventListener("click", () => {
  openPopup(popupProfile);
});
closeButtonProfile.addEventListener("click", () => {
  closePopup(popupProfile);
});

//Открытие-Закрытие формы добавления карточек
addCardButton.addEventListener("click", () => {
  openPopup(popupCards);
});
closeCardButton.addEventListener("click", () => {
  closePopup(popupCards);
});

// Обработчик «отправки» формы редактирования профиля
function formSubmitHandler(evt) {
  evt.preventDefault();

  let profileTitle = document.querySelector(".profile__title");
  let profileSubtitle = document.querySelector(".profile__subtitle");

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(popupProfile);
}

// Прикрепляем обработчик к форме:
formElement.addEventListener("submit", formSubmitHandler);

//-----------------------------------------------Форма добавления карточки------------------------------------------------

const main = document.querySelector(".main");
const elementsContainer = main.querySelector(".elements");
const element = elementsContainer.querySelectorAll(".element");

// Создание карточки
function addCard(titleValue, linkValue) {
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
    .addEventListener("click", handleClick);

  //Открытие изображения для созданной карточки
  cardElement
    .querySelector(".element__image")
    .addEventListener("click", (evt) => {
      evt.preventDefault();
      openImg(linkValue, titleValue);
    });

  elementsContainer.prepend(cardElement);

  return cardElement;
}

// Обработчик "отправки" формы добавления карточки в контейнер
function submitCardButton(evt) {
  evt.preventDefault();

  const title = document.querySelector("#title");
  const link = document.querySelector("#link");

  addCard(title.value, link.value);

  title.value = "";
  link.value = "";

  closePopup(popupCards);
}
// Прикрепляем обработчик к форме
formCards.addEventListener("submit", submitCardButton);

//------------------------------------------------------------Шесть карточек из "коробки"---------------------------------------------------

initialCards.forEach(function (element) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(".element__image").src = element.link;
  cardElement.querySelector(".element__image").alt = element.name;
  cardElement.querySelector(".element__title").textContent = element.name;
  cardElement
    .querySelector(".element__button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__button_active");
    });

  // Открытие попапа с изображением
  cardElement
    .querySelector(".element__image")
    .addEventListener("click", (evt) => {
      evt.preventDefault();
      openImg(element.link, element.name);
    });

  elementsContainer.append(cardElement);
});

//------------------------------------------------------------Удаление карточки---------------------------------------------------

// Выбираем кнопку удаления
const deleteButton = document.querySelectorAll(".element__delete-button");

// Функция удаления карточки
handleClick = (evt) => {
  evt.target.closest(".element").remove();
};

// Добавляем обработчик
deleteButton.forEach((item) => item.addEventListener("click", handleClick));

//------------------------------------------------------------Открытие попапа с картинкой--------------------------------------------------

const openImgPopup = document.querySelector(".popup__image");
const closeImgPopup = document.querySelector("#close-button-img");

// Закрытие попапа с изобраением
closeImgPopup.addEventListener("click", () => {
  closePopup(openImgPopup);
});

// Функция открытия Изображения
function openImg(linkImg, titleImg) {
  openPopup(openImgPopup);
  openImgPopup.querySelector(".popup__img").src = linkImg;
  openImgPopup.querySelector(".popup__img").alt = titleImg;
  openImgPopup.querySelector(".popup__title-img").textContent = titleImg;
}
