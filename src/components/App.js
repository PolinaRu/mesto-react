import React from "react";
import Api from "../utlis/Api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

class App extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = { 
        isEditProfilePopupOpen: false,
        isAddPlacePopupOpen: false,
        isEditAvatarPopupOpen: false,
        selectedCard: {},
        currentUser: {},
        cards: [] };
    }

   // Метод будет вызван сразу после монтирования: получаем первичные данные
   componentDidMount() {
    Promise.all([Api.getUser(), Api.getInitialCards()])
        .then(([user, cards]) => {
          this.setState({currentUser: {userName: user.name,
            userDescription: user.about,
            userAvatar: user.avatar,
            _id: user._id},
            cards: cards
          });
        })
        .catch((err) => {
          console.error(err);
        });
  }
    // Обработчики событий: изменяют внутреннее состояние
    handleEditAvatarClick = () => {
      this.setState({ isEditAvatarPopupOpen: true });
    };
    handleUpdateAvatar = (link) => {
      Api.editProfileAvatar(link)
      .then(()=>{
        this.setState({currentUser: {...this.state.currentUser, userAvatar:link}});
        this.closeAllPopups();
      })
    }
    handleEditProfileClick = () => {
      this.setState({ isEditProfilePopupOpen: true });
    };
    handleUpdateUser = ({name, about}) => {
      Api.editProfile(name,about)
      .then(() => {
        this.setState({currentUser: {...this.state.currentUser, userName:name,userDescription: about}});
        this.closeAllPopups();
      });
    };
    handleAddPlaceClick = () => {
      this.setState({ isAddPlacePopupOpen: true });
    };
    handleCardClick = (card)=> {
      this.setState({ selectedCard: card });
    };
    handleCardDelete = (id) => {
      Api.deleteMyElement(id)
      .then(() => {
        this.setState({cards: this.state.cards.filter((item)=>item._id !== id)})
      });
    };
    handleCardLike(card) {
      const isLiked = card.likes.some(i => i._id === this.state.currentUser._id);  
      // Отправляем запрос в API и получаем обновлённые данные карточки
      Api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        this.setState({cards: this.state.cards.map((c) => c._id === card._id ? newCard : c)});
      });
    };
    closeAllPopups = ()=> {
      this.setState({ 
        isEditAvatarPopupOpen: false,
        isEditProfilePopupOpen: false,
        isAddPlacePopupOpen: false,
        selectedCard: {}
       });
    };
  
render() {
  return (
    <CurrentUserContext.Provider value={this.state.currentUser}>
      <Header />
      <Main 
        cards={this.state.cards}
        onEditProfile={this.handleEditProfileClick}
        onAddPlace={this.handleAddPlaceClick}
        onEditAvatar={this.handleEditAvatarClick} 
        onCardClick={this.handleCardClick} 
        onCardDelete={this.handleCardDelete}
        onCardLike={this.handleCardLike.bind(this)}/>
      <Footer />
      <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups} />

      <EditProfilePopup 
        isOpen={this.state.isEditProfilePopupOpen} 
        onClose={this.closeAllPopups} 
        onUpdateUser={this.handleUpdateUser} /> 
      
      <PopupWithForm 
        name="element"
        title="Новое место"
        buttonText="Сохранить"
        isOpen={this.state.isAddPlacePopupOpen}
        onClose={this.closeAllPopups}>
            <fieldset className="popup__title">
              <input
                className="popup__input"
                type="text"
                name="element__title"
                id="element-title"
                placeholder="Название"
                required
                defaultValue=""
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
                defaultValue=""
              />
              <span className="popup__input-error element-link-error"></span>
            </fieldset>
      </PopupWithForm>

      <EditAvatarPopup 
        isOpen={this.state.isEditAvatarPopupOpen} 
        onClose={this.closeAllPopups} 
        onUpdateAvatar={this.handleUpdateAvatar} />
  </CurrentUserContext.Provider>
  );
}}

export default App;
