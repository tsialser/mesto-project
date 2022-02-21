const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const popup = document.querySelector(".popup");
const popupProfile = document.querySelector('.popup__profile');
const popupEditForm = document.getElementById('edit-profile');

const profileName = document.getElementById('name');
const profileJob = document.getElementById('job');
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__subtitle');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];
  


// Функции открытия-закрытия самого модального окна
function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

// Открытие-Закрытие формы редактирования профиля 
editButton.addEventListener("click", () => {
  openPopup(popupProfile);
  formValue();
});

closeButton.addEventListener("click", () => closePopup(popupProfile));

// Заполнение формы значениями, указанными на странице
function formValue() {
  profileName.value = nameInput.textContent;
  profileJob.value = jobInput.textContent;
}

// Редактирование информации о себе
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.textContent = profileName.value;
  jobInput.textContent = profileJob.value;
  closePopup(popupProfile);
}
popupEditForm.addEventListener('submit', formSubmitHandler);


