import {Popup} from './Popup.js';
export class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._popupImage = this._popupElement.querySelector('.popup__image');
        this._popupImageTitle = this._popupElement.querySelector('.popup__imagetitle');
    }
    open(link, name){
        super.open()
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupImageTitle.textContent = name;
    }
}