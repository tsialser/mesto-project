export const initialCards = [
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

export const settings = {
  formElement: '.popup__form',
  formInput: '.popup__input',
  submitButton: '.popup__submit-button',
  inputError: 'popup__input-error_active',
  error: 'popup__input_type_error',
};

export const popups = document.querySelectorAll(".popup");
export const popupProfile = document.querySelector(".popup_type_profile");
export const popupCards = document.querySelector(".popup_type_cards");
export const openImgPopup = document.querySelector(".popup_type_image");
export const btnEditProfile = document.querySelector(".profile__edit-button");
export const closeButtonProfile = document.querySelector(
  "#close-button-profile"
);
export const popupImg = document.querySelector(".popup__img");
export const popupImgTitle = openImgPopup.querySelector(".popup__title-img");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const addCardButton = document.querySelector(".profile__add-button");
export const closeCardButton = document.querySelector("#close-button-cards");
export const formProfile = document.forms.editProfile;
export const formCards = document.forms.addCard;
export const title = formCards.elements.title;
export const link = formCards.elements.link;
export const nameInput = formProfile.elements.name;
export const jobInput = formProfile.elements.job;
export const submitButtonProfile = document.querySelector(
  "#profile-submit-button"
);
export const submitButtonCard = document.querySelector("#card-submit-button");
export const cardTemplate = document.querySelector("#card-template").content;
export const closeImgPopup = document.querySelector("#close-button-img");
export const main = document.querySelector(".main");
export const elementsContainer = main.querySelector(".elements");
export const key = "Escape";
