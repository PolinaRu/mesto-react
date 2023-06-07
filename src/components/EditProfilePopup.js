import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
   // Стейт, в котором содержится значение инпута
   const [name, setName] = React.useState('');
   const [description, setDescription] = React.useState('');
   
   React.useEffect(() => {
    setName(currentUser.userName);
    setDescription(currentUser.userDescription);
  }, [currentUser]); 

 function handleChangeName(e) {
  setName(e.target.value);
 }
 function handleChangeDescription(e) {
  setDescription(e.target.value);
 }
 function handleSubmit(e) {
  e.preventDefault();
  // Передаём значения управляемых компонентов во внешний обработчик
  onUpdateUser({name, about: description, });
 }

  return(
    <PopupWithForm 
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        name="profile"
        title="Редактировать профиль"
        buttonText="Сохранить">
        <fieldset className="popup__title">
              <input
                className="popup__input"
                type="text"
                name="profile__title"
                id="profile-title"
                placeholder="Имя"
                required
                value={name}
                onChange={handleChangeName}
                minLength={2}
                maxLength={40}
                pattern="^[a-zA-Zа-яА-яёЁ\s\-]+$"
                data-error-message="Поле должно содержать только латинские, кириллические буквы, знаки дефиса и пробелы."
              />
              <span className="popup__input-error profile-title-error"></span>
            </fieldset>
            <fieldset className="popup__subtitle">
              <input
                className="popup__input"
                type="text"
                name="profile__subtitle"
                id="profile-subtitle"
                placeholder="Профессия"
                required
                value={description}
                onChange={handleChangeDescription}
                minLength={2}
                maxLength={200}
                pattern="^[a-zA-Zа-яА-яёЁ\s\-]+$"
                data-error-message="Поле должно содержать только латинские, кириллические буквы, знаки дефиса и пробелы."
              />
              <span className="popup__input-error profile-subtitle-error"></span>
            </fieldset>
      </PopupWithForm>
  );
};

export default EditProfilePopup;