export class Popup {
    constructor(popupSelector) {
      this._popupElement = document.querySelector(popupSelector);
      this._closeElement = this._popupElement.querySelector('.popup__close');
    }

    _handleEscClose(evt){
        if ('popup_opened' in this._popupElement.classList){
            document.removeEventListener('keydown', (evt) => {
                if (evt.code === 'Escape') {
                    this.close();
                }
            });
        } else {
            document.addEventListener('keydown', (evt) => {
                if (evt.code === 'Escape') {
                    this.close();
                }
            });
        }
    }

    setEventListeners(){
        this._closeElement.addEventListener('click', (evt) => {
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
  