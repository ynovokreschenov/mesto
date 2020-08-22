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

const popupEditProfile = document.querySelector('#edit_profile'); // попап профиля
const popupAddPlace = document.querySelector('#add_place'); // попап добавления карточки
const popupPlaceView = document.querySelector('#image_view'); // попап просмотра фотографии

const buttonEditProfile = document.querySelector('.profile__edit-button'); // кнопка открытия формы профиля
const buttonAddPlace = document.querySelector('.profile__add-button'); // кнопка открытия формы добавления карточки

// функция, которая делает видимым или скрытым тот попап, который передан ей в качестве аргумента
function togglePopup(popup) {
    popup.classList.toggle('popup_opened');
}

// функция открытия попапа редактирования профиля - по сути обработчик события клика
function openProfileForm(event) {
    document.querySelector('input[name="popup_title"]').value = document.querySelector('.profile__title').textContent
    document.querySelector('input[name="popup_subtitle"]').value = document.querySelector('.profile__subtitle').textContent
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

// создание карточки из объекта card (такой же объект, как в массиве)
function createCard(card){
    let cardElement = document.querySelector('#card_template').content.cloneNode(true);
    cardElement.querySelector('.element__title').textContent = card.name;
    cardElement.querySelector('.element__image').src = card.link;
    // обработчик лайка для cardElement
    cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    // обработчик для кнопки удаления карточки
    cardElement.querySelector('.element__trash').addEventListener('click', function (evt) {
        evt.target.parentElement.remove()
    });

    // обработчик для кнопки удаления карточки
    cardElement.querySelector('.element__image').addEventListener('click', function (evt) {
        document.querySelector('.popup__image').src = card.link,
        document.querySelector('.popup__image_title').textContent = card.name,
        openPlaceView(evt);
    });
    return cardElement;
}

// первоначальное заполнение карточками
initialCards.forEach((item) => {
    document.querySelector('.elements').append(createCard(item));
});

// обработчик для формы добавления карточки
document.querySelector('#card_save_btn').addEventListener('click', (event) => {
    event.preventDefault();
    let newCard = {
        name: document.querySelector('input[name="place-name"]').value,
        link: document.querySelector('input[name="place-link"]').value
    };
    document.querySelector('.elements').prepend(createCard(newCard));
    togglePopup(popupAddPlace);
});

// обработчик формы редактирования профиля
document.querySelector('#profile_save_btn').addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.profile__title').textContent = document.querySelector('input[name="popup_title"]').value
    document.querySelector('.profile__subtitle').textContent = document.querySelector('input[name="popup_subtitle"]').value
    togglePopup(popupEditProfile);
});

// кнопка редактирования профиля
buttonEditProfile.addEventListener('click', openProfileForm);
// кнопка добавления карточки
buttonAddPlace.addEventListener('click', openPlaceForm);

// добавляем обработчик для всех кнопок закрытия попапов на странице
document.querySelectorAll('#popup__close').forEach((button) => {
    button.addEventListener('click', (event) => {
      togglePopup(event.target.closest('.popup'));
    });
});