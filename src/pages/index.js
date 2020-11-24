import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {UserInfo} from '../components/UserInfo.js';
//import pic from '../images/add-icon.svg'

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const cardListSelector = '.elements';
const buttonEditProfile = document.querySelector('.profile__edit-button'); // кнопка открытия формы профиля
const cardPlaceName = document.querySelector('input[name="place-name"]'); // элемент название места на форме добавления карточки
const cardPlaceLink = document.querySelector('input[name="place-link"]'); // элемент ссылка на фото на форме добавления карточки
const buttonAddPlace = document.querySelector('.profile__add-button'); // кнопка открытия формы добавления карточки

const hidePopup = function (popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscPressed);
};

let handleEscPressed = function (evt) {
    if(evt.code === 'Escape') {
        hidePopup(document.querySelector('.popup_opened'));
    }
};

// функция создания новой карточки
function card(cardObj) {
    const card = new Card(cardObj, '.card_template', handleCardClick);
    return card.generateCard();
}

// кнопка редактирования профиля
const editProfileCallback = function (evt) {
    evt.preventDefault();
    
    const attrMap = new Map()
    attrMap.set('popup_title','.profile__title')
    attrMap.set('popup_subtitle','.profile__subtitle')
    const formList = new FormData(evt.target.parentElement.parentElement);
    formList.forEach((value, key) => {
        document.querySelector(attrMap.get(key)).textContent = value;
    });
};

let userInfo = new UserInfo({userTitle:'.profile__title', userSubtitle:'.profile__subtitle'});

const editProfile = new PopupWithForm('#edit_profile', editProfileCallback);
buttonEditProfile.addEventListener('click', (evt) => {
    editProfile.setEventListeners();
    editProfile.open(userInfo.getUserInfo(), {userTitle:'#profile_edit_title', userSubtitle:'#profile_edit_subtitle'});
});

// кнопка добавления карточки
const addPlaceCallback = function (evt) {
    evt.preventDefault();
    const newCard = {
        name: cardPlaceName.value,
        link: cardPlaceLink.value
    };
    //cardElements.prepend(card(newCard));
    cardElements.addItem(card(newCard));
}

const addPlace = new PopupWithForm('#add_place', addPlaceCallback);
buttonAddPlace.addEventListener('click', (evt) => {
    addPlace.setEventListeners();
    addPlace.open();
});


// закрытие кликом на overlay
document.querySelectorAll('.popup__shade').forEach((button) => {
    button.addEventListener('click', (event) => {
        hidePopup(event.target.closest('.popup'));
    });
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
