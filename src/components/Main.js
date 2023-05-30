import React from "react";
import editPath from "../images/edit.svg";
import Api from "../utlis/Api";
import Card from "./Card";

class Main extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = { 
        userName: "",
        userDescription: "",
        userAvatar: "",
        cards: [] };
    }

     // Метод будет вызван сразу после монтирования: получаем первичные данные
    componentDidMount() {
      Promise.all([Api.getUser()])
        .then(([user]) => {
          //profile.id = user._id;
          this.setState({userName: user.name,
            userDescription: user.about,
            userAvatar: user.avatar});
        })
        .catch((err) => {
          console.error(err);
        });
      Promise.all([Api.getInitialCards()])
        .then(([cards]) => {
          this.setState({cards: cards});
        })
        .catch((err) => {
          console.error(err);
        });
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
          <img className="profile__avatar-img" alt="автарка" src={this.state.userAvatar} />
        </button>
        <div id="profileId" className="profile__info">
          <div className="profile__text">
            <h1 className="profile__title">{this.state.userName}</h1>
            <button
              type="button"
              className="profile__button profile__button_making_edit"
              onClick={this.props.onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{this.state.userDescription}</p>
        </div>
        <button
          type="button"
          className="profile__button profile__button_making_add"
          onClick={this.props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
        {this.state.cards.map((card) => (
          <Card card={card} onCardClick={this.props.onCardClick}/>
        ))}
        </ul>
      </section>
    </main>
  )
}
};

export default Main;