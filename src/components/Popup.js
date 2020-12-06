import {ESCAPE_CODE} from '../utils/constants.js';

export class Popup {
    constructor(popupSelector) {
      this._popupElement = document.querySelector(popupSelector);
      this._closeElement = this._popupElement.querySelector('.popup__close');
      this._popupShade = this._popupElement.querySelector('.popup__shade');
      this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose(evt) {
        if(evt.code === ESCAPE_CODE) {
          this.close();
      }
    };

    setEventListeners(){
        this._closeElement.addEventListener('click', () => {
            this.close();
        });
        this._popupShade.addEventListener('click', () => {
            this.close();
        });
    }

    open(){
        document.addEventListener('keydown', this._handleEscClose);
        this._popupElement.classList.add('popup_opened');
    }

    close(){
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupElement.classList.remove('popup_opened');
    }
}
  