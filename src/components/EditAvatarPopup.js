import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();  
    onUpdateAvatar(linkRef.current.value);
  } 

  return (<PopupWithForm 
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}>
        <fieldset className="popup__subtitle">
              <input
                type="url"
                className="popup__input"
                name="avatar__link"
                defaultValue=""
                ref={linkRef}
                placeholder="Ссылка на изображение"
                id="avatar-link"
                required
              />
              <span className="popup__input-error avatar-link-error"></span>
    </fieldset> 
    </PopupWithForm>);
};

export default EditAvatarPopup;