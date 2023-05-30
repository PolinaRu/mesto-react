function Card({card, onCardClick}) {
  function handleClick() {
    onCardClick(card);
  }  

  return (
  <li className="element" key={card._id}>
    <img className="element__image popup__image" 
      src={card.link} 
      alt={card.name} 
      onClick={handleClick}/>
    <button
      type="button"
      className="element__button element__button_remove"
    ></button>
    <h2 className="element__title">{card.name}</h2>
    <div className="element__like">
      <button
        type="button"
        className="element__button element__button_like like"
      ></button>
      <p className="element__like-sum">{card.likes.length}</p>
    </div>
  </li>);
}

export default Card;