//Функция, которая добавляет класс с ошибкой
const showError = (formElement, formInput, errorMessage, settings) => {
  //Находим элемент ошибки внутри самой функции
  const formError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add(settings.error);
  //Так текст ошибки попадёт в нужное место
  formError.textContent = errorMessage;

  //Это сделает ошибку видимой, когда в поле ввода добавят некорректный текст.
  formError.classList.add(settings.inputError);
};

//Функция, которая удаляет класс с ошибкой
const hideError = (formElement, formInput, settings) => {
  //Находим элемент ошибки
  const formError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove(settings.error);
  formError.classList.remove(settings.inputError);
  formError.textContent = "";
};

//Функция, которая проверяет валидность поля. принимает formElement и formInput, а не берет их из внешней области видимости
const checkInputValidity = (formElement, formInput, settings) => {
  if (!formInput.validity.valid) {
    //Если поле не проходит валидацию, покажем ошибку. Получает параметром форму, в которой находятся проверяемое поле, и само это поле
    showError(formElement, formInput, formInput.validationMessage, settings);
  } else {
    // Если проходит, скроем. Получает параметром форму, в которой находится проверяемое поле, и само это поле
    hideError(formElement, formInput, settings);
  }
};

const setEventListeners = (formElement, settings) => {
  //Находим все поля внутри формы, сделаем из них массиы Array.from
  const inputList = Array.from(formElement.querySelectorAll(settings.formInput));
  //Найдем в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(settings.submitButton);
  //Вызовем toggleButtonState, чтобы не ждать ввода данных в поле
  toggleButtonState(inputList, buttonElement);
  //Обойдем все элементы полученной коллекции
  inputList.forEach((formInput) => {
    //Каждому полю добавим обработчик событий input
    formInput.addEventListener("input", () => {
      //Внутри колбека вызовем checkInputValidity, передав ей форму и проверяемый элемент
      checkInputValidity(formElement, formInput, settings);
      //Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = (settings) => {
  //Найдем все формы с указанным классом в DOM, сделаем из них массив Array.from
  const fromList = Array.from(document.querySelectorAll(settings.formElement));
  //Переберем полученную коллекцию
  fromList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      //У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    //Для каждой формы вызовем функцию setEventListener, передав ей элемент формы
    setEventListeners(formElement, settings);
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
const toggleButtonState = (inputList, buttonElement) => {
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
