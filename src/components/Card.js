import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardDelete, onCardLike}) {
  // Подписываемся на контекст
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `element__button element__button_like ${isLiked && 'element__button_like_active'}` 
  );

  function handleClick() {
    onCardClick(card);
  } 
  function handleDeleteClick() {
    onCardDelete(card._id);
  }
  function handleCardLike() {
    onCardLike(card);
  }

  return (
  <li className="element">
    <img className="element__image popup__image" 
      src={card.link} 
      alt={card.name} 
      onClick={handleClick}/>
    {isOwn && <button
      type="button"
      className="element__button element__button_remove"
      onClick={handleDeleteClick}
    ></button>}
    <h2 className="element__title">{card.name}</h2>
    <div className="element__like">
      <button
        type="button"
        className={cardLikeButtonClassName}
        onClick={handleCardLike}
      ></button>
      <p className="element__like-sum">{card.likes.length}</p>
    </div>
  </li>);
}

export default Card;