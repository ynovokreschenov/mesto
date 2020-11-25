import {Popup} from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback){
        super(popupSelector)
        this._submitCallback = submitCallback;
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._submitButton = this._popupElement.querySelector('.popup__button');
    }

    //_getInputValues(data, selectors){
    _getInputValues(){
        /*for (let key in data){
            this._popupForm.querySelector(selectors[key]).value = data[key]
        }*/
        const formList = new FormData(this._popupForm);
        /*let object = {};
        formList.forEach(function(value, key){
            object[key] = value;
        });
        return object;*/
        return formList
    }

    setEventListeners(){
        super.setEventListeners();
        //console.log(this._getInputValues());
        /*this._submitButton.addEventListener('click', (evt) => {
            this._submitCallback(evt);
            super.close()
        });*/
        this._submitButton.addEventListener('click', (evt) => {
            //const formData = this._getInputValues();
            //this._submitCallback(evt);
            this._submitCallback(this._getInputValues());
            //console.log(formData);
            super.close()
        });
    }

    /*open(data, selectors){
        this._getInputValues(data, selectors);
        super.open()
    }*/

    close(){
        this._popupForm.reset();
        super.close()
        /*this._popupForm.querySelectorAll('.popup__text').forEach((element) => {
            element.value = "";
        });*/
    }
    
}