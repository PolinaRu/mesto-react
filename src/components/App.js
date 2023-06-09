import React from "react";
import Api from "../utlis/Api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
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
      .catch((err) => {
        console.error(err);
      });
    }
    handleEditProfileClick = () => {
      this.setState({ isEditProfilePopupOpen: true });
    };
    handleUpdateUser = ({name, about}) => {
      Api.editProfile(name,about)
      .then(() => {
        this.setState({currentUser: {...this.state.currentUser, userName:name,userDescription: about}});
        this.closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
    };
    handleAddPlaceClick = () => {
      this.setState({ isAddPlacePopupOpen: true });
    };
    handleAddPlaceSubmit = (name, link) => {
      Api.postNewElement(name, link)
      .then((card) => {
        this.setState({cards: [card, ...this.state.cards,]});
        this.closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
    };
    handleCardClick = (card)=> {
      this.setState({ selectedCard: card });
    };
    handleCardDelete = (id) => {
      Api.deleteMyElement(id)
      .then(() => {
        this.setState({cards: this.state.cards.filter((item)=>item._id !== id)})
      })
      .catch((err) => {
        console.error(err);
      });
    };
    handleCardLike(card) {
      const isLiked = card.likes.some(i => i._id === this.state.currentUser._id);  
      // Отправляем запрос в API и получаем обновлённые данные карточки
      Api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        this.setState({cards: this.state.cards.map((c) => c._id === card._id ? newCard : c)});
      })
      .catch((err) => {
        console.error(err);
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

      <EditAvatarPopup 
        isOpen={this.state.isEditAvatarPopupOpen} 
        onClose={this.closeAllPopups} 
        onUpdateAvatar={this.handleUpdateAvatar} />

      <AddPlacePopup 
        isOpen={this.state.isAddPlacePopupOpen} 
        onClose={this.closeAllPopups} 
        onAddPlace={this.handleAddPlaceSubmit} />

  </CurrentUserContext.Provider>
  );
}}

export default App;
