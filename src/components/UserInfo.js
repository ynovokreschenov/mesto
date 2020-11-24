export class UserInfo {
    constructor(data) {
        this._userTitle = document.querySelector(data.userTitle);
        this._userSubtitle = document.querySelector(data.userSubtitle);
        this._userTitleSelector = data.userTitle;
        this._userSubtitleSelector = data.userSubtitle;
    }

    getUserInfo(){
        const title = this._userTitle.textContent;
        const subtitle = this._userSubtitle.textContent;
        return {
            userTitle:title,
            userSubtitle:subtitle
        };
    }

    setUserInfo(title, subtitle){
        document.querySelector(this._userTitleSelector).textContent = title;
        document.querySelector(this._userSubtitleSelector).textContent = subtitle;
    }
  }
  