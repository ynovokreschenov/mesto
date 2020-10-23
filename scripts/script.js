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

const ESC_KEYCODE = 27;
let activePopup = null;

// ЭЛЕМЕНТЫ DOM
// редактирование профиля
const popupEditProfile = document.querySelector('#edit_profile'); // попап профиля
const buttonEditProfile = document.querySelector('.profile__edit-button'); // кнопка открытия формы профиля
const profilePopupFormTitle = popupEditProfile.querySelector('#profile_edit_title'); // имя в попап форме
const profileTitle = document.querySelector('.profile__title'); // имя профиля на странице
const profileSubtitle = document.querySelector('.profile__subtitle');
const profilePopupFormSubitle = popupEditProfile.querySelector('#profile_edit_subtitle'); // профессия в попап форме

// добавление карточек
const cardElements = document.querySelector('.elements'); // блок, содержащий карточки
const cardPlaceName = document.querySelector('input[name="place-name"]'); // элемент название места на форме добавления карточки
const cardPlaceLink = document.querySelector('input[name="place-link"]'); // элемент ссылка на фото на форме добавления карточки
const popupAddPlace = document.querySelector('#add_place'); // попап добавления карточки
const popupPlaceView = document.querySelector('#image_view'); // попап просмотра фотографии
const buttonAddPlace = document.querySelector('.profile__add-button'); // кнопка открытия формы добавления карточки
const popupImage = document.querySelector('.popup__image'); // ссылка на картинку 
const popupImageTitle = document.querySelector('.popup__imagetitle'); // описание картинки

// ФУНКЦИИ
// делает видимым или скрытым тот попап, который передан ей в качестве аргумента
let handleEscPressed;

function togglePopup(popup) {
    popup.classList.toggle('popup_opened');
    if (popup.classList.contains("popup_opened")) {
        document.addEventListener('keydown', handleEscPressed);
        activePopup = popup;
    }
    else {
        document.removeEventListener('keydown', handleEscPressed);
        activePopup = null;
    }
}

handleEscPressed = function (evt) {
    if(evt.keyCode === ESC_KEYCODE) {
        togglePopup(activePopup);
    }
};

// функция открытия попапа редактирования профиля
function openProfileForm() {
    profilePopupFormTitle.value = profileTitle.textContent;
    profilePopupFormSubitle.value = profileSubtitle.textContent;
    togglePopup(popupEditProfile);
}

// функция открытия попапа добавления карточки
function openPlaceForm() {
    togglePopup(popupAddPlace);
}

// функция открытия попапа просмотра фотографии
function openPlaceView() {
    togglePopup(popupPlaceView);
}

// создание карточки из объекта card
function createCard(card){
    const cardElement = document.querySelector('#card_template').content.cloneNode(true);
    cardElement.querySelector('.element__title').textContent = card.name;
    const elementImage = cardElement.querySelector('.element__image');
    elementImage.src = card.link;
    elementImage.alt = card.name;
    // обработчик лайка для cardElement
    cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like_active');
    });
    // обработчик для кнопки удаления карточки
    cardElement.querySelector('.element__trash').addEventListener('click', (evt) => {
        evt.target.parentElement.remove();
    });
    // обработчик для картинки
    elementImage.addEventListener('click', (evt) => {
        popupImage.src = card.link,
        popupImage.alt = card.name,
        popupImageTitle.textContent = card.name,
        openPlaceView(evt);
    });
    return cardElement;
}

// первоначальное заполнение карточками
initialCards.forEach((item) => {
    cardElements.append(createCard(item));
});

// обработчик для формы добавления карточки
document.querySelector('#card_save_btn').addEventListener('click', (event) => {
    event.preventDefault();
    const newCard = {
        name: cardPlaceName.value,
        link: cardPlaceLink.value
    };
    cardElements.prepend(createCard(newCard));
    togglePopup(popupAddPlace);
});

// обработчик формы редактирования профиля
document.querySelector('#profile_save_btn').addEventListener('click', (event) => {
    event.preventDefault();
    profileTitle.textContent = profilePopupFormTitle.value;
    profileSubtitle.textContent = profilePopupFormSubitle.value;
    togglePopup(popupEditProfile);
});

// кнопка редактирования профиля
buttonEditProfile.addEventListener('click', openProfileForm);
// кнопка добавления карточки
buttonAddPlace.addEventListener('click', openPlaceForm);

// добавляем обработчик для всех кнопок закрытия попапов на странице
document.querySelectorAll('.popup__close').forEach((button) => {
    button.addEventListener('click', (event) => {
        togglePopup(event.target.closest('.popup'));
    });
});

// закрытие кликом на overlay
document.querySelectorAll('.popup__shade').forEach((button) => {
    button.addEventListener('click', (event) => {
        togglePopup(event.target.closest('.popup'));
    });
});
