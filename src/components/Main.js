import React from "react";
import editPath from "../images/edit.svg";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

class Main extends React.Component {
    static contextType = CurrentUserContext;
    constructor(props) {
      super(props);
    }
  
render() {
  return (
    <main className="main">
      <section className="profile">
        <button 
          id="buttonEditAvatar"
          type="button" 
          className="profile__avatar"          
          onClick={this.props.onEditAvatar}>
          <img
            className="profile__avatar-edit"
            src={editPath}
            alt="изменить аватарку"
          />
          <img className="profile__avatar-img" alt="автарка" src={this.context.userAvatar} />
        </button>
        <div id="profileId" className="profile__info">
          <div className="profile__text">
            <h1 className="profile__title">{this.context.userName}</h1>
            <button
              type="button"
              className="profile__button profile__button_making_edit"
              onClick={this.props.onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{this.context.userDescription}</p>
        </div>
        <button
          type="button"
          className="profile__button profile__button_making_add"
          onClick={this.props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
        {this.props.cards.map((card) => (
          <Card 
            card={card} 
            onCardClick={this.props.onCardClick}
            onCardDelete={this.props.onCardDelete}
            onCardLike={this.props.onCardLike}
            key={card._id}/>
        ))}
        </ul>
      </section>
    </main>
  )
}
};

export default Main;