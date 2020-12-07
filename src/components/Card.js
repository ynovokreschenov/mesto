export class Card {
    constructor(data, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick, userID) {
        this._id = data._id;
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._likes = data.likes;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
        this._ownerId = data.owner._id;
        this._userID = userID;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    getId(){
        return this._id;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.id = this._id;
        this._setEventListeners();

        this._elementImage = this._element.querySelector('.element__image');
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        if (this._likes?.length > 0){
            this._element.querySelector('.element__likes').textContent = this._likes.length;
            this._likes.forEach(element => {
                if (this._userID === element._id){
                    this._element.querySelector('.element__like').classList.add('element__like_active');
                }
            });
        }
        if (this._userID !== this._ownerId){
            this._element.querySelector('.element__trash').classList.add('element__trash_hidden');
        }

        return this._element;
    }

    _setEventListeners() {
 
        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._handleDeleteClick(this);
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._link, this._name);
        });
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._handleLikeClick(this);
        });
    }

    toggleLikeState(likes) {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
        this._element.querySelector('.element__likes').textContent = likes;
    }
}