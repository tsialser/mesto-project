//Находим форму в DOM
const popupEditProfile = document.querySelector(".popup_js-edit-profile");
const popupAddCard = document.querySelector(".popup_js-add-card");
const addProfile = document.querySelector(".profile__edit-button");
const addCard = document.querySelector(".profile__add-button");
const closeProfile = document.querySelector(".js-close-profile");
const closeCard = document.querySelector(".js-close-card");
const editSave = document.querySelector(".popup_edit-save");
const addSave = document.querySelector(".popup_add-save");

/* Обработчик «отправки» формы
function formSubmitHandler(evt) {
    evt.preventDefault();
    const popup = document.querySelector('.popup');
    popup.classList.add('popup_opened');

}*/

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
addProfile.addEventListener("click", function () {
  popupEditProfile.classList.add("popup_opened");
});

addCard.addEventListener("click", function () {
  popupAddCard.classList.add("popup_opened");
});

//Закрытие модального окна
closeProfile.addEventListener("click", function () {
  popupEditProfile.classList.remove("popup_opened");
});

editSave.addEventListener("click", function () {
  popupEditProfile.classList.remove("popup_opened");
});

closeCard.addEventListener("click", function () {
  popupAddCard.classList.remove("popup_opened");
});

addSave.addEventListener("click", function () {
  popupAddCard.classList.remove("popup_opened");
});
