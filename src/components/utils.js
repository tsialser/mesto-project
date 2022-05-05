import {
  profileTitle,
  profileSubtitle,
  nameInput,
  jobInput,
  popupProfile,
} from "./constants.js";
import { closePopup } from "./modal.js";
import { editProfile } from "./api.js";

// Обработчик «отправки» формы редактирования профиля
export function handleProfileSubmit(evt) {
  evt.preventDefault();

  editProfile({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then((user) => {
      profileTitle.textContent = user.name;
      profileSubtitle.textContent = user.about;
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.error(err);
    });
}

//Функция добавления информации в попап профиля
export function addFormValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}
