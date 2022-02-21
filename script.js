/*
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector('.profile__add-button');
const closeButtonProfile = document.getElementById("close-button-profile");
const closeButtonCards = document.getElementById("close-button-cards");
const popup = document.querySelector(".popup");

const popupCards = document.querySelector(".popup__cards");
const popupEditForm = document.getElementById("edit-profile");

const profileName = document.getElementById("name");
const profileJob = document.getElementById("job");
const nameInput = document.querySelector(".profile__title");
const jobInput = document.querySelector(".profile__subtitle");

//const likeButton = document.querySelectorAll('.element__button');





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



//Открытие-Закрытие формы добавления карточек
addButton.addEventListener('click', () => {
  openPopup(popupCards);
})

closeButtonCards.addEventListener('click', () => closePopup(popupCards));


// Реализация лайков
likeButton.forEach(function(el) {
  el.addEventListener('click', function(evt) {
      evt.target.classList.toggle('element__button_active');
  });
});


//Реализация добавления карточки

const addButtonCard = document.querySelector('.popup__add-card');

function formSubmit(evt) {
  evt.preventDefault();

}

addButtonCard.addEventListener('click', function(){
  const name = document.getElementById('title');
  const link = document.getElementById('link');

  addCard(name.value, link.value);

  console.log(name.value, link.value);
  name.value='';
  link.value='';
})*/


const popup = document.querySelector(".popup");
const popupProfile = document.querySelector(".popup__profile");
const popupCards = document.querySelector(".popup__cards");
const editProfileButton = document.querySelector(".profile__edit-button");
const closeButtonProfile = document.querySelector("#close-button-profile");
const addCardButton = document.querySelector(".profile__add-button");
const closeCardButton = document.querySelector("#close-button-cards");
const formElement = document.querySelector("#form-profile");
const formCards = document.querySelector('#form-cards');
const nameInput = formElement.querySelector("#name");
const jobInput = formElement.querySelector("#job");

//---------------------------------------------------Работа модальных окон------------------------------------------------

// Функции открытия-закрытия самого модального окна
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
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
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__image').src = linkValue;
  cardElement.querySelector('.element__image').alt = titleValue;
  cardElement.querySelector('.element__title').textContent = titleValue;
  cardElement.querySelector('.element__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active');
  })

  elementsContainer.prepend(cardElement);
}

// Добавление крточки в контейнер
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
formCards.addEventListener('submit', submitCardButton);