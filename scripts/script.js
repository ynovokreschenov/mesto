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
let profilePopupFormTitle = document.querySelector('input[name="popup_title"]'); // имя в попап форме
let profileTitle = document.querySelector('.profile__title'); // имя профиля на странице
let profileSubtitle = document.querySelector('.profile__subtitle');
let profilePopupFormSubitle = document.querySelector('input[name="popup_subtitle"]'); // профессия в попап форме

// добавление карточек
let cardElements = document.querySelector('.elements'); // блок, содержащий карточки
let cardPlaceName = document.querySelector('input[name="place-name"]'); // элемент название места на форме добавления карточки
let cardPlaceLink = document.querySelector('input[name="place-link"]') // элемент ссылка на фото на форме добавления карточки
const popupAddPlace = document.querySelector('#add_place'); // попап добавления карточки
const popupPlaceView = document.querySelector('#image_view'); // попап просмотра фотографии
const buttonAddPlace = document.querySelector('.profile__add-button'); // кнопка открытия формы добавления карточки

// ФУНКЦИИ
// функция, которая делает видимым или скрытым тот попап, который передан ей в качестве аргумента
function togglePopup(popup) {
    popup.classList.toggle('popup_opened');
}

// функция открытия попапа редактирования профиля
function openProfileForm(event) {
    profilePopupFormTitle.value = profileTitle.textContent;
    profilePopupFormSubitle.value = profileSubtitle.textContent;
    togglePopup(popupEditProfile); // popupProfile - передаем, чтобы открылся попап профиля
}

// функция открытия попапа добавления карточки
function openPlaceForm(event) {
    togglePopup(popupAddPlace);
}

// функция открытия попапа просмотра фотографии
function openPlaceView(event) {
    togglePopup(popupPlaceView);
}

// создание карточки из объекта card
function createCard(card){
    const cardElement = document.querySelector('#card_template').content.cloneNode(true);
    cardElement.querySelector('.element__title').textContent = card.name;
    cardElement.querySelector('.element__image').src = card.link;
    cardElement.querySelector('.element__image').alt = card.name;
    // обработчик лайка для cardElement
    cardElement.querySelector('.element__like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like_active');
    });
    // обработчик для кнопки удаления карточки
    cardElement.querySelector('.element__trash').addEventListener('click', (evt) => {
        evt.target.parentElement.remove();
    });

    // обработчик для кнопки удаления карточки
    cardElement.querySelector('.element__image').addEventListener('click', (evt) => {
        document.querySelector('.popup__image').src = card.link,
        document.querySelector('.popup__image').alt = card.name,
        document.querySelector('.popup__imagetitle').textContent = card.name,
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
    profileTitle.textContent = profilePopupFormTitle.value
    profileSubtitle.textContent = profilePopupFormSubitle.value
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