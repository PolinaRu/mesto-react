function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup-image ${card.link && ' popup_opened'}`}>
      <div className="popup__window-image">
        <button
          type="button"
          className="popup__button popup__button_making_exit popup__button_making_exit-img"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption
            className="popup__subtitle popup__image-subtitle"
          >{card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
};

export default ImagePopup;