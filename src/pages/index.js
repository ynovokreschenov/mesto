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
const buttonEditAvatar = document.querySelector('.profile__avatar-edit-button'); // кнопка открытия формы редактирования аватара
const profileAvatar = document.querySelector('.profile__avatar');

// функция создания новой карточки
function card(cardObj) {
    const card = new Card(cardObj, '.card_template', handleCardClick, handleDeleteClick, handleLikeClick);
    return card.generateCard();
}

const userInfo = new UserInfo({userTitle:'.profile__title', userSubtitle:'.profile__subtitle'});

// кнопка редактирования профиля
const editProfileCallback = function (data) {
    editProfile.renderLoading(true);
    api.editUserInfo(data.get('popup_title'), data.get('popup_subtitle'))
    .then((result) => {
        const resultData = {};
        resultData['userTitle'] = result.name;
        resultData['userSubtitle'] = result.about;
        userInfo.setUserInfo(resultData);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        editProfile.renderLoading(false);
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

// редактирование аватара
const editAvatarCallback = function (data) {
    editAvatar.renderLoading(true);
    api.editAvatar(data.get('avatar-link'))
    .then((result) => {
        profileAvatar.src = result.avatar;
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        editAvatar.renderLoading(false);
    });
};

const editAvatar = new PopupWithForm('#edit_avatar', editAvatarCallback);
editAvatar.setEventListeners();
buttonEditAvatar.addEventListener('click', () => {
    editAvatar.open();
});

// добавление новой карточки
const addPlaceCallback = function (data) {
    addPlace.renderLoading(true);
    api.addNewCard(data.get('place-name'), data.get('place-link'))
    .then((result) => {
        const resultData = {};
        resultData['name'] = result.name;
        resultData['link'] = result.link;
        cardElements.addItem(card(resultData));
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        addPlace.renderLoading(false);
    });
}

const addPlace = new PopupWithForm('#add_place', addPlaceCallback);
addPlace.setEventListeners();
buttonAddPlace.addEventListener('click', () => {
    addPlace.open();
});

// удаление карточки
const confirmDeleteCallback = function (data) {
    api.deleteCard(data.get('card_id'))
    .then((result) => {
        // удалить элемент из интерфейса
        if (result.message === "Пост удалён"){
            document.querySelector(`div[id='${data.get('card_id')}']`).remove();  
        }
    })
    .catch((err) => {
        console.log(err);
    });
}

// создадим объект попапа удаления карточки
const deletePlace = new PopupWithForm('#confirm_delete', confirmDeleteCallback);
deletePlace.setEventListeners();
const handleDeleteClick = function (card) {
    document.querySelector('#card_id').value = card.getId();
    deletePlace.open();
};

// обработчик лайков
const handleLikeClick = function (card) {
    const cardId = card.getId();
    const cardElement = document.querySelector(`div[id='${cardId}']`);
    if (Array.from(cardElement.querySelector('.element__like').classList).includes("element__like_active")){
        api.dislikeCard(cardId)
        .then((result) => {
            card.toggleLikeState(result.likes.length);
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
        api.likeCard(cardId)
        .then((result) => {
            card.toggleLikeState(result.likes.length);
        })
        .catch((err) => {
            console.log(err);
        });
    }
};

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
        //const profileAvatar = document.querySelector('.profile__avatar');
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
                const card = new Card(item, '.card_template', handleCardClick, handleDeleteClick, handleLikeClick)
                const cardElement = card.generateCard();
                cardElements.addItem(cardElement);
            }},
            cardListSelector
            );
        cardElements.renderItems();
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

