import {
  profileTitle,
  profileSubtitle,
  nameInput,
  jobInput,
  popupProfile,
} from "./constants.js";
import { closePopup } from "./modal.js";

// Обработчик «отправки» формы редактирования профиля
export function handleProfileSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(popupProfile);
}

// Функция добавления информации в попап профиля
export function addFormValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}
