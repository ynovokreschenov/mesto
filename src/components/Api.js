export class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;
    }
  
    getUserInfo(){
        return fetch(this.baseUrl+'/users/me', {
            headers: this.headers
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка: ${response.status}`);
        });
    }

    editUserInfo(name, about){
        return fetch(this.baseUrl+'/users/me', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка: ${response.status}`);
        });
    }

    getInitialCards() {
        return fetch(this.baseUrl+'/cards', {
            headers: this.headers
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка: ${response.status}`);
        });
    }

    addNewCard(name, link){
        return fetch(this.baseUrl+'/cards', {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка: ${response.status}`);
        });
    }

    deleteCard(cardId){
        return fetch(this.baseUrl+'/cards/'+cardId, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка: ${response.status}`);
        });
    }

    likeCard(cardId){
        return fetch(this.baseUrl+'/cards/likes/'+cardId, {
            method: 'PUT',
            headers: this.headers,
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка: ${response.status}`);
        });
    }

    dislikeCard(cardId){
        return fetch(this.baseUrl+'/cards/likes/'+cardId, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка: ${response.status}`);
        });
    }

    editAvatar(link){
        return fetch(this.baseUrl+'/users/me/avatar', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка: ${response.status}`);
        });
    }
}