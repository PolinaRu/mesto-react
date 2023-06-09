import {usePopupClose} from '../hooks/usePopupClose';

function PopupWithForm({isOpen, onClose, onSubmit, name, title, buttonText, children}) {
  usePopupClose(isOpen, onClose);

  return (<div className={`popup popup-${name} ${isOpen && ' popup_opened'}`}>
  <div className="popup__window">
    <h3 className="popup__name">{title}</h3>
    <button
      type="button"
      className="popup__button popup__button_making_exit"
      onClick={onClose}
    ></button>
    <form
      name={name}
      onSubmit={onSubmit}
      className="popup__container"
      //noValidate
    >
      {children}
      <button
        type="submit"
        className="popup__button popup__button_making_save popup__button_making_save_avatar"
        //disabled
      >
        {buttonText}
      </button>
    </form>
  </div>
</div>);
}

export default PopupWithForm;