import {Popup} from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback){
        super(popupSelector)
        this._submitCallback = submitCallback;
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._submitButton = this._popupElement.querySelector('.popup__button');
    }

    _getInputValues(data, selectors){
        for (let key in data){
            console.log(data[key]);
            this._popupForm.querySelector(selectors[key]).value = data[key]
        }
    }

    setEventListeners(){
        super.setEventListeners();
        this._submitButton.addEventListener('click', (evt) => {
            this._submitCallback(evt);
            super.close()
        });
    }

    open(data, selectors){
        this._getInputValues(data, selectors);
        super.open()
    }

    close(){
        super.close()
        this._popupForm.querySelectorAll('.popup__text').forEach((element) => {
            element.value = "";
        });
    }
    
}