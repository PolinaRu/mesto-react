import React from "react";
import editPath from "../images/edit.svg";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main ({onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardDelete, onCardLike}) {
  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main className="main">
      <section className="profile">
        <button 
          id="buttonEditAvatar"
          type="button" 
          className="profile__avatar"          
          onClick={onEditAvatar}>
          <img
            className="profile__avatar-edit"
            src={editPath}
            alt="изменить аватарку"
          />
          <img className="profile__avatar-img" alt="автарка" src={currentUser.userAvatar} />
        </button>
        <div id="profileId" className="profile__info">
          <div className="profile__text">
            <h1 className="profile__title">{currentUser.userName}</h1>
            <button
              type="button"
              className="profile__button profile__button_making_edit"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.userDescription}</p>
        </div>
        <button
          type="button"
          className="profile__button profile__button_making_add"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
        {cards.map((card) => (
          <Card 
            card={card} 
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
            key={card._id}/>
        ))}
        </ul>
      </section>
    </main>
  )
};

export default Main;