import {Popup} from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback){
        super(popupSelector)
        this._submitCallback = submitCallback;
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._submitButton = this._popupElement.querySelector('.popup__button');
        this._buttonText = this._submitButton.textContent;
    }

    _getInputValues(){
        const formList = new FormData(this._popupForm);
        return formList
    }

    setEventListeners(){
        super.setEventListeners();
        this._submitButton.addEventListener('click', (evt) => {
            this._submitCallback(this._getInputValues());
            super.close()
        });
    }

    close(){
        this._popupForm.reset();
        super.close()
    }
    
    renderLoading(isLoading){
        if (isLoading) {
            this._submitButton.textContent = "Загрузка...";
        } else {
            this._submitButton.textContent = this._buttonText;
        }
    }
}