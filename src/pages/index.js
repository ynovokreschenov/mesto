import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';

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
    api.editUserInfo(data.get('popup_title'), data.get('popup_subtitle'))
    .then((result) => {
        const resultData = {};
        resultData['userTitle'] = result.name;
        resultData['userSubtitle'] = result.about;
        userInfo.setUserInfo(resultData);
    })
    .catch((err) => {
        console.log(err);
    });
};


const editProfile = new PopupWithForm('#edit_profile', editProfileCallback);
editProfile.setEventListeners();
buttonEditProfile.addEventListener('click', () => {
    const userData = userInfo.getUserInfo()
    document.querySelector('#profile_edit_title').value = userData.userTitle;
    document.querySelector('#profile_edit_subtitle').value = userData.userSubtitle;
    editProfile.open();
});

// добавление новой карточки
const addPlaceCallback = function (data) {
    api.addNewCard(data.get('place-name'), data.get('place-link'))
    .then((result) => {
        const resultData = {};
        resultData['name'] = result.name;
        resultData['link'] = result.link;
        cardElements.addItem(card(resultData));
    })
    .catch((err) => {
        console.log(err);
    });
}

const addPlace = new PopupWithForm('#add_place', addPlaceCallback);
addPlace.setEventListeners();
buttonAddPlace.addEventListener('click', () => {
    addPlace.open();
});

// ЗАПОЛНЕНИЕ ДАННЫМИ С СЕРВЕРА
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
    headers: {
        authorization: '91702f05-7054-404f-bd0f-d5812d156063',
        'Content-Type': 'application/json'
    }
});
// заполняем профиль данными с сервера
api.getUserInfo()
    .then((result) => {
        document.querySelector('.profile__title').textContent = result.name;
        document.querySelector('.profile__subtitle').textContent = result.about;
        const profileAvatar = document.querySelector('.profile__avatar');
        profileAvatar.src = result.avatar;
        profileAvatar.alt = result.name;
    })
    .catch((err) => {
        console.log(err);
    });

// создадим объект попапа просмотра фотографии
const cardPopup = new PopupWithImage('#image_view');
cardPopup.setEventListeners();
const handleCardClick = function (link, name) {
    cardPopup.open(link, name);
};

// получим данные карточек с сервера
let cardElements = null;
api.getInitialCards()
    .then((items) => {
        cardElements = new Section({
            items: items,
            renderer: (item) => {
                const card = new Card(item, '.card_template', handleCardClick)
                const cardElement = card.generateCard();
                cardElements.addItem(cardElement);
            }},
            cardListSelector
            );
        cardElements.renderItems();
        //console.log(items);
    })
    .catch((err) => {
        console.log(err);
    });

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

