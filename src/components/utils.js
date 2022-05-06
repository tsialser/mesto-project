import {
  profileTitle,
  profileSubtitle,
  nameInput,
  jobInput,
  popupProfile,
  profileAvatar,
  popupEditAvatar,
  avatarLink,
} from "./constants.js";
import { closePopup } from "./modal.js";
import { editProfile, updateAvatar } from "./api.js";

// Обработчик «отправки» формы редактирования профиля
export function handleProfileSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение..";

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
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

//Функция добавления информации в попап профиля
export function addFormValue() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

// Обработчик обновления аватара
export function handleAvatarSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение..";

  updateAvatar({
    avatar: avatarLink.value,
  })
    .then((data) => {
      profileAvatar.src = data.avatar;
      closePopup(popupEditAvatar);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}
