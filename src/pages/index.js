import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {UserInfo} from '../components/UserInfo.js';
import {initialCards} from '../utils/constants.js';

const cardListSelector = '.elements';
const buttonEditProfile = document.querySelector('.profile__edit-button'); // кнопка открытия формы профиля
const buttonAddPlace = document.querySelector('.profile__add-button'); // кнопка открытия формы добавления карточки

// функция создания новой карточки
function card(cardObj) {
    const card = new Card(cardObj, '.card_template', handleCardClick);
    return card.generateCard();
}

const userInfo = new UserInfo({userTitle:'.profile__title', userSubtitle:'.profile__subtitle'});

// кнопка редактирования профиля
const editProfileCallback = function (data) {
    const newData = {}
    const attrMap = new Map();
    attrMap.set('popup_title','userTitle');
    attrMap.set('popup_subtitle','userSubtitle');
    data.forEach((value, key) => {
        newData[attrMap.get(key)] = value;
    });
    userInfo.setUserInfo(newData);
};


const editProfile = new PopupWithForm('#edit_profile', editProfileCallback);
buttonEditProfile.addEventListener('click', () => {
    editProfile.setEventListeners();
    const userData = userInfo.getUserInfo()
    document.querySelector('#profile_edit_title').value = userData.userTitle;
    document.querySelector('#profile_edit_subtitle').value = userData.userSubtitle;
    editProfile.open();
});

const addPlaceCallback = function (data) {
    const newCard = {}
    const attrMap = new Map();
    attrMap.set('place-name','name');
    attrMap.set('place-link','link');
    data.forEach((value, key) => {
        newCard[attrMap.get(key)] = value;
    });
    cardElements.addItem(card(newCard));
}

const addPlace = new PopupWithForm('#add_place', addPlaceCallback);
buttonAddPlace.addEventListener('click', () => {
    addPlace.setEventListeners();
    addPlace.open();
});

// ЗАПОЛНЕНИЕ ДАННЫМИ
// создадим объект попапа просмотра фотографии
const cardPopup = new PopupWithImage('#image_view');
cardPopup.setEventListeners();
const handleCardClick = function (link, name) {
    cardPopup.open(link, name);
};

const cardElements = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '.card_template', handleCardClick)
        const cardElement = card.generateCard();
        cardElements.addItem(cardElement);
    }},
    cardListSelector
    );

cardElements.renderItems();

// активация валидаторов
const validatorElements = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__text-error',
}

const formList = Array.from(document.querySelectorAll(validatorElements.formSelector));

formList.forEach((form) => {
    const validator = new FormValidator(validatorElements, form);
    validator.enableValidation();
});
