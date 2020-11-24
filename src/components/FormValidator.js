export class FormValidator {
    constructor(params, formElement) {
        this.formElement = formElement;
        this.inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
        this.buttonElement = formElement.querySelector(params.submitButtonSelector);
        this.inactiveButtonClass = params.inactiveButtonClass;
        this.inputErrorClass = params.inputErrorClass;
    }

    enableValidation() {
        this._toggleButtonState(); // чтобы проверить состояние кнопки в самом начале
        this._setEventListeners();
    }

    _setEventListeners() {
        this.formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this.inputList)) {
            this.buttonElement.classList.add(this.inactiveButtonClass);
            this.buttonElement.disabled = true;
        } else {
            this.buttonElement.classList.remove(this.inactiveButtonClass);
            this.buttonElement.disabled = false;
        }
    }

    _hasInvalidInput() {
        return this.inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this.inputErrorClass);
        errorElement.textContent = errorMessage;
    }
    
    _hideInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this.inputErrorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
}