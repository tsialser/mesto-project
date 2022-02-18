//Находим форму в DOM
const popup = document.querySelector(".popup");
const formElement = document.querySelector(".js-open-modal");
const closeElement = document.querySelector(".js-close-modal")

/* Обработчик «отправки» формы
function formSubmitHandler(evt) {
    evt.preventDefault();
    const popup = document.querySelector('.popup');
    popup.classList.add('popup_opened');

}*/

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("click", function form() {
  popup.classList.add("popup_opened");
});

//Закрытие модального окна
closeElement.addEventListener("click", function() {
    popup.classList.remove("popup_opened");
})