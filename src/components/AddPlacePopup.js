import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
   }
   function handleChangeLink(e) {
    setLink(e.target.value);
   }

  function handleSubmit(e) {
    e.preventDefault();  
    onAddPlace(name, link);
  } 

  return (<PopupWithForm 
    name="element"
    title="Новое место"
    buttonText="Сохранить"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}>
        <fieldset className="popup__title">
          <input
            className="popup__input"
            type="text"
            name="element__title"
            id="element-title"
            placeholder="Название"
            required
            value={name}
            onChange={handleChangeName}
            minLength={2}
            maxLength={30}
            pattern="^[a-zA-Zа-яА-яёЁ\s\-]+$"
            data-error-message="Поле должно содержать только латинские, кириллические буквы, знаки дефиса и пробелы."
          />
          <span className="popup__input-error element-title-error"></span>
        </fieldset>
        <fieldset className="popup__subtitle">
          <input
            className="popup__input"
            type="url"
            name="element__link"
            id="element-link"
            placeholder="Ссылка на картинку"
            required
            value={link}
            onChange={handleChangeLink}
          />
          <span className="popup__input-error element-link-error"></span>
        </fieldset>
  </PopupWithForm>);
};

export default AddPlacePopup;