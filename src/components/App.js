import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

class App extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = { 
        isEditProfilePopupOpen: false,
        isAddPlacePopupOpen: false,
        isEditAvatarPopupOpen: false,
        selectedCard: {} };
    }
  
    // Обработчики событий: изменяют внутреннее состояние
    handleEditAvatarClick = () => {
      this.setState({ isEditAvatarPopupOpen: !this.state.isEditAvatarPopupOpen });
    };
    handleEditProfileClick = () => {
      this.setState({ isEditProfilePopupOpen: !this.state.isEditProfilePopupOpen });
    };
    handleAddPlaceClick = () => {
      this.setState({ isAddPlacePopupOpen: !this.state.isAddPlacePopupOpen });
    };
    handleCardClick = (card)=> {
      this.setState({ selectedCard: card });
    }
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
   <>
    <Header />
    <Main 
      onEditProfile={this.handleEditProfileClick}
      onAddPlace={this.handleAddPlaceClick}
      onEditAvatar={this.handleEditAvatarClick} 
      onCardClick={this.handleCardClick} />
    <Footer />
    <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups} />

    <PopupWithForm 
      isOpen={this.state.isEditProfilePopupOpen}
      onClose={this.closeAllPopups}
      name="profile"
      title="Редактировать профиль">
          <fieldset className="popup__title">
            <input
              className="popup__input"
              type="text"
              name="profile__title"
              id="profile-title"
              placeholder="Имя"
              required
              defaultValue=""
              minLength={2}
              maxLength={40}
              pattern="^[a-zA-Zа-яА-яёЁ\s\-]+$"
              data-error-message="Поле должно содержать только латинские, кириллические буквы, знаки дефиса и пробелы."
            />
            <span className="popup__input-error profile-title-error"></span>
          </fieldset>
          <fieldset className="popup__subtitle">
            <input
              className="popup__input"
              type="text"
              name="profile__subtitle"
              id="profile-subtitle"
              placeholder="Профессия"
              required
              defaultValue=""
              minLength={2}
              maxLength={200}
              pattern="^[a-zA-Zа-яА-яёЁ\s\-]+$"
              data-error-message="Поле должно содержать только латинские, кириллические буквы, знаки дефиса и пробелы."
            />
            <span className="popup__input-error profile-subtitle-error"></span>
          </fieldset>
    </PopupWithForm>
    <PopupWithForm 
      name="element"
      title="Новое место"
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
    <PopupWithForm 
      name="avatar"
      title="Обновить аватар"
      isOpen={this.state.isEditAvatarPopupOpen}
      onClose={this.closeAllPopups}>
       <fieldset className="popup__subtitle">
            <input
              type="url"
              className="popup__input"
              name="avatar__link"
              defaultValue=""
              placeholder="Ссылка на изображение"
              id="avatar-link"
              required
            />
            <span className="popup__input-error avatar-link-error"></span>
  </fieldset> 
  </PopupWithForm>
</>
  );
}}

export default App;
