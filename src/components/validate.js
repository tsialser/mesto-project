//Функция, которая добавляет класс с ошибкой
const showError = (formElement, formInput, errorMessage) => {
  //Находим элемент ошибки внутри самой функции
  const formError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add("popup__input_type_error");
  //Так текст ошибки попадёт в нужное место
  formError.textContent = errorMessage;

  //Это сделает ошибку видимой, когда в поле ввода добавят некорректный текст.
  formError.classList.add("popup__input-error_active");
};

//Функция, которая удаляет класс с ошибкой
const hideError = (formElement, formInput) => {
  //Находим элемент ошибки
  const formError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove("popup__input_type_error");
  formError.classList.remove("popup__input-error_active");
  formError.textContent = "";
};

//Функция, которая проверяет валидность поля. принимает formElement и formInput, а не берет их из внешней области видимости
const checkInputValidity = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    //Если поле не проходит валидацию, покажем ошибку. Получает параметром форму, в которой находятся проверяемое поле, и само это поле
    showError(formElement, formInput, formInput.validationMessage);
  } else {
    // Если проходит, скроем. Получает параметром форму, в которой находится проверяемое поле, и само это поле
    hideError(formElement, formInput);
  }
};

const setEventListeners = (formElement) => {
  //Находим все поля внутри формы, сделаем из них массиы Array.from
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  //Найдем в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(".popup__submit-button");
  //Вызовем toggleButtonState, чтобы не ждать ввода данных в поле
  toggleButtonStste(inputList, buttonElement);
  //Обойдем все элементы полученной коллекции
  inputList.forEach((formInput) => {
    //Каждому полю добавим обработчик событий input
    formInput.addEventListener("input", () => {
      //Внутри колбека вызовем checkInputValidity, передав ей форму и проверяемый элемент
      checkInputValidity(formElement, formInput);
      //Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonStste(inputList, buttonElement);
    });
  });
};

export const enableValidation = () => {
  //Найдем все формы с указанным классом в DOM, сделаем из них массив Array.from
  const fromList = Array.from(document.querySelectorAll(".popup__form"));
  //Переберем полученную коллекцию
  fromList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
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
  return inputList.some((formInput) => {
    //Если поле не валидно, колбек вернет true, обход массива прекратится и вся функция hasInvalidInput вернет true
    return !formInput.validity.valid;
  });
};

//Функция принимает массив полей ввода и элемент кнопки, сщстояние которой нужно менять
const toggleButtonStste = (inputList, buttonElement) => {
  //Если есть хотя бы один невалидный input
  if (hasInvalidInput(inputList)) {
    //Сделаем кнопку неактивной
    buttonElement.classList.add("popup__submit-button_type_disabled");
    buttonElement.classList.remove("button-hover");
    buttonElement.setAttribute("disabled", true);
  } else {
    //Иначе сделаем кнопку активной
    buttonElement.classList.remove("popup__submit-button_type_disabled");
    buttonElement.classList.add("button-hover");
    buttonElement.removeAttribute("disabled");
  }
};
