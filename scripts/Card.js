export class Card {
    constructor(data, cardSelector, handleImageOpen) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleImageOpen = handleImageOpen;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._elementImage = this._element.querySelector('.element__image');
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._handleTrashClick();
        });
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._handleLikeClick();
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleImageOpen(this._link, this._name);
        });
    }

    _handleTrashClick() {
        this._element.querySelector('.element__trash').parentElement.remove();
    }

    _handleLikeClick() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }
}