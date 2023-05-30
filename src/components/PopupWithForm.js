function PopupWithForm(props) {
  return (<div className={`popup popup-${props.name} ${props.isOpen && ' popup_opened'}`}>
  <div className="popup__window popup__window-avatar">
    <h3 className="popup__name">{props.title}</h3>
    <button
      type="button"
      className="popup__button popup__button_making_exit"
      onClick={props.onClose}
    ></button>
    <form
      id="avatarEditForm"
      name={props.name}
      className="popup__container"
      noValidate
    >
      {props.children}
      <button
        type="submit"
        id="avatarSubmit"
        className="popup__button popup__button_making_save popup__button_making_save_avatar"
        disabled
      >
        Сохранить
      </button>
    </form>
  </div>
</div>);
}

export default PopupWithForm;