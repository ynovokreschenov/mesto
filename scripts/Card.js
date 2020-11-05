export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
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
            this._handleImageOpen();
        });
    }

    _handleTrashClick() {
        this._element.querySelector('.element__trash').parentElement.remove();
    }

    _handleLikeClick() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _handleImageOpen() {
        const popupImage = document.querySelector('.popup__image');
        popupImage.src = this._link;
        popupImage.alt = this._name;
        const popupImageTitle = document.querySelector('.popup__imagetitle');
        popupImageTitle.textContent = this._name;
        const popupPlaceView = document.querySelector('#image_view');
        this._togglePopup(popupPlaceView);
    }
    
    _togglePopup(popup) {
        popup.classList.toggle('popup_opened');
        if (popup.classList.contains("popup_opened")) {
            document.addEventListener('keydown', (evt) => {
                const ESC_KEYCODE = 27;
                if(evt.keyCode === ESC_KEYCODE) {
                    this._togglePopup(popup);
                }
            });
        }
        else {
            document.removeEventListener('keydown', this._handleEscPressed);
        }
    }

}