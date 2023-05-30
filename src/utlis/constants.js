const set = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
  
const elements = '.elements__list';
const popupProfileName = '.popup-profile';
const popupAvatarName = '.popup-avatar';
const buttonEdit = document.querySelector('.profile__button_making_edit');
const buttonAdd = document.querySelector('.profile__button_making_add');
const buttonsExit = document.querySelectorAll('.popup__button_making_exit');
const profileAvatar = '.profile__avatar-img';
const profileTitle = '.profile__title';
const profileSubtitle = '.profile__subtitle';
const profileTitleNew = document.querySelector('#profile-title');
const profileSubtitleNew = document.querySelector('#profile-subtitle');
const popupElementName = '.popup-element';
const newElementTitle = document.querySelector('#element-title');
const newElementLink = document.querySelector('#element-link');
const popupImage = '.popup-image';
const imagePopupImage = '.popup__image';
const subtitlePopupImage = '.popup__subtitle';
const elementTemplate = '#elementTemplate';
const cardSubmitButton = document.querySelector('#submitButton');
const buttonAvatar = document.querySelector('#avatarSubmit');
const avatarForm = document.forms["avatarEdit"];

const avatarLink = document.querySelector('#avatar-link');
const profile = document.querySelector('#profileId');
const buttonEditAvatar = document.querySelector('#buttonEditAvatar');
const newElementId = document.querySelector('#newElementId');
export const newElementForm = document.forms["elementEdit"];
export const profileEditForm = document.forms["profileEdit"];
export { set, newElementId, buttonEditAvatar, profile, avatarLink, avatarForm, buttonAvatar, popupAvatarName, elements, popupProfileName, buttonEdit, buttonAdd, buttonsExit, profileAvatar, profileTitle, profileSubtitle, profileTitleNew, profileSubtitleNew, popupElementName, newElementTitle, newElementLink, popupImage, imagePopupImage, subtitlePopupImage, elementTemplate, cardSubmitButton };