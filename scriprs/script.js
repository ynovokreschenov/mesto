// ЭЛЕМЕНТЫ DOM
// данные пользователя на странице
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
// кнопка редактирования профиля
let editButton = document.querySelector('.profile__edit-button');
// параметры попапа редактирования профиля
let editProfilePopup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
// атрибуты формы попапа
let popupTitle = document.querySelector('.popup__title');
let popupSubtitle = document.querySelector('.popup__subtitle');
// элемент формы попапа
let formElement = document.querySelector('.popup__form');

// ФУНКЦИИ
function closeEditPrifileForm(){
    editProfilePopup.classList.remove('popup_opened');
}

function editPrifile(){
    editProfilePopup.classList.add('popup_opened');
    popupTitle.value = profileTitle.textContent
    popupSubtitle.value = profileSubtitle.textContent
}

function formSubmitHandler(evt){
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    profileTitle.textContent = popupTitle.value
    profileSubtitle.textContent = popupSubtitle.value
    editProfilePopup.classList.remove('popup_opened');
}

// ХЕНДЛЕРЫ
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
// открывает окно попапа
editButton.addEventListener('click', editPrifile);
// закрытие окна попапа без сохранения данных
closePopupButton.addEventListener('click', closeEditPrifileForm);