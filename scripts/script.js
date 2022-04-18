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
const formProfile = document.forms.editProfile;
const formCards = document.forms.addCard;
const title = formCards.elements.title;
const link = formCards.elements.link;
const nameInput = formProfile.elements.name;
const jobInput = formProfile.elements.job;
const submitButtonProfile = document.querySelector("#profile-submit-button");
const submitButtonCard = document.querySelector("#card-submit-button");
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

// Открытие формы добавления карточек
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

  setSubmitButtonCards(false);
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

//----------------------------- Валидация формы---------------------------------------------
//Функция, которая добавляет класс с ошибкой
const showError = (formElement, formInput, errorMessage) => {
  //Находим элемент ошибки внутри самой функции
  const formError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add('popup__input_type_error');
  //Так текст ошибки попадёт в нужное место
  formError.textContent = errorMessage;

  //Это сделает ошибку видимой, когда в поле ввода добавят некорректный текст.
  formError.classList.add('popup__input-error_active');
}

//Функция, которая удаляет класс с ошибкой
const hideError = (formElement, formInput) => {
  //Находим элемент ошибки
  const formError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove('popup__input_type_error');
  formError.classList.remove('popup__input-error_active');
  formError.textContent = '';
}

//Функция, которая проверяет валидность поля. принимает formElement и formInput, а не берет их из внешней области видимости
const checkInputValidity = (formElement, formInput) => {
  if(!formInput.validity.valid) {
//Если поле не проходит валидацию, покажем ошибку. Получает параметром форму, в которой находятся проверяемое поле, и само это поле
    showError(formElement, formInput, formInput.validationMessage);    
  } else {
// Если проходит, скроем. Получает параметром форму, в которой находится проверяемое поле, и само это поле
    hideError(formElement,formInput);
  }
}

const setEventListeners = (formElement) => {
  //Находим все поля внутри формы, сделаем из них массиы Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  //Найдем в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.popup__submit-button');
  //Вызовем toggleButtonState, чтобы не ждать ввода данных в поле
  toggleButtonStste(inputList, buttonElement);
  //Обойдем все элементы полученной коллекции
  inputList.forEach((formInput) => {
    //Каждому полю добавим обработчик событий input
    formInput.addEventListener('input', () => {
      //Внутри колбека вызовем checkInputValidity, передав ей форму и проверяемый элемент
      checkInputValidity(formElement, formInput);
      //Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonStste(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  //Найдем все формы с указанным классом в DOM, сделаем из них массив Array.from
  const fromList = Array.from(document.querySelectorAll('.popup__form'));
  //Переберем полученную коллекцию
  fromList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      //У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    //Для каждой формы вызовем функцию setEventListener, передав ей элемент формы
    setEventListeners(formElement);
  });
};

//Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  //Проходим по этому массиву методом some
  return inputList.some((formInput) =>  {
    //Если поле не валидно, колбек вернет true, обход массива прекратится и вся функция hasInvalidInput вернет true
    return !formInput.validity.valid;
  });
};

//Функция принимает массив полей ввода и элемент кнопки, сщстояние которой нужно менять
const toggleButtonStste = (inputList, buttonElement) => {
  //Если есть хотя бы один невалидный input
  if(hasInvalidInput(inputList)) {
    //Сделаем кнопку неактивной
    buttonElement.classList.add('popup__submit-button_type_disabled');
    buttonElement.classList.remove('button-hover');
    buttonElement.setAttribute("disabled", true);
  } else {
    //Иначе сделаем кнопку активной
    buttonElement.classList.remove('popup__submit-button_type_disabled');
    buttonElement.classList.add('button-hover');
    buttonElement.removeAttribute("disabled");
  }
};
//Вызовем функцию
enableValidation();

