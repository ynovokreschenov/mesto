import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

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

// ЭЛЕМЕНТЫ DOM
// редактирование профиля
const popupEditProfile = document.querySelector('#edit_profile'); // попап профиля
const buttonEditProfile = document.querySelector('.profile__edit-button'); // кнопка открытия формы профиля
const profilePopupFormTitle = popupEditProfile.querySelector('#profile_edit_title'); // имя в попап форме
const profileTitle = document.querySelector('.profile__title'); // имя профиля на странице
const profileSubtitle = document.querySelector('.profile__subtitle');
const profilePopupFormSubitle = popupEditProfile.querySelector('#profile_edit_subtitle'); // профессия в попап форме

// добавление карточек
const cardPlaceName = document.querySelector('input[name="place-name"]'); // элемент название места на форме добавления карточки
const cardPlaceLink = document.querySelector('input[name="place-link"]'); // элемент ссылка на фото на форме добавления карточки
const popupAddPlace = document.querySelector('#add_place'); // попап добавления карточки
const popupPlaceView = document.querySelector('#image_view'); // попап просмотра фотографии
const buttonAddPlace = document.querySelector('.profile__add-button'); // кнопка открытия формы добавления карточки
const popupImage = document.querySelector('.popup__image'); // ссылка на картинку 
const popupImageTitle = document.querySelector('.popup__imagetitle'); // описание картинки

// ФУНКЦИИ
// делает видимым или скрытым тот попап, который передан ей в качестве аргумента
const showPopup = function (popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscPressed);
};

const hidePopup = function (popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscPressed);
};

const handleImageOpen = function (link, name) {
    popupImage.src = link;
    popupImage.alt = name;
    popupImageTitle.textContent = name;
    showPopup(popupPlaceView);
};

let handleEscPressed = function (evt) {
    if(evt.code === 'Escape') {
        hidePopup(document.querySelector('.popup_opened'));
    }
};

// функция открытия попапа редактирования профиля
function openProfileForm() {
    profilePopupFormTitle.value = profileTitle.textContent;
    profilePopupFormSubitle.value = profileSubtitle.textContent;
    showPopup(popupEditProfile);
}

// функция открытия попапа добавления карточки
function openPlaceForm() {
    showPopup(popupAddPlace);
}

// функция создания новой карточки
function card(cardObj) {
    const card = new Card(cardObj, '.card_template', handleImageOpen);
    return card.generateCard();
}

// обработчик для формы добавления карточки
document.querySelector('#card_save_btn').addEventListener('click', (event) => {
    event.preventDefault();
    const newCard = {
        name: cardPlaceName.value,
        link: cardPlaceLink.value
    };

    cardElements.prepend(card(newCard));
    hidePopup(popupAddPlace);
});

// обработчик формы редактирования профиля
document.querySelector('#profile_save_btn').addEventListener('click', (event) => {
    event.preventDefault();
    profileTitle.textContent = profilePopupFormTitle.value;
    profileSubtitle.textContent = profilePopupFormSubitle.value;
    hidePopup(popupEditProfile);
});

// кнопка редактирования профиля
buttonEditProfile.addEventListener('click', openProfileForm);
// кнопка добавления карточки
buttonAddPlace.addEventListener('click', openPlaceForm);

// добавляем обработчик для всех кнопок закрытия попапов на странице
document.querySelectorAll('.popup__close').forEach((button) => {
    button.addEventListener('click', (event) => {
        hidePopup(event.target.closest('.popup'));
    });
});

// закрытие кликом на overlay
document.querySelectorAll('.popup__shade').forEach((button) => {
    button.addEventListener('click', (event) => {
        hidePopup(event.target.closest('.popup'));
    });
});

// ЗАПОЛНЕНИЕ ДАННЫМИ
// первоначальное заполнение карточками
const cardElements = document.querySelector('.elements');
initialCards.forEach((item) => {
    cardElements.append(card(item));
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
