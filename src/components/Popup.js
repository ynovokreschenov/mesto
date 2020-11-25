import {ESCAPE_CODE} from '../utils/constants.js';

export class Popup {
    constructor(popupSelector) {
      this._popupElement = document.querySelector(popupSelector);
      this._closeElement = this._popupElement.querySelector('.popup__close');
      this._popupShade = this._popupElement.querySelector('.popup__shade');
    }

    _handleEscClose(){
        const handleEscPressed = function (evt) {
            if(evt.code === ESCAPE_CODE) {
                this.close();
            }
        };
        if ('popup_opened' in this._popupElement.classList){
            document.removeEventListener('keydown', handleEscPressed.bind(this));
        } else {
            document.addEventListener('keydown', handleEscPressed.bind(this));
        }
    }

    setEventListeners(){
        this._closeElement.addEventListener('click', () => {
            this.close();
        });
        this._popupShade.addEventListener('click', () => {
            this.close();
        });
    }

    open(){
        this._popupElement.classList.add('popup_opened');
        this._handleEscClose();
    }

    close(){
        this._popupElement.classList.remove('popup_opened');
        this._handleEscClose()
    }
  }
  