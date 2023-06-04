class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  /** Метод, возвращаюший объект с данными пользователя */
  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = this._userName.textContent;
    this._userInfo.about = this._userAbout.textContent;
    return this._userInfo;
  }
  
  /** Метод, принимающий новые данные пользователя и добавляет их на страницу */ 
  setUserInfo(name, about) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
  }
 
  setUserAvatar(avatarLink) {
    this._userAvatar.src = avatarLink;
  }
}

export { UserInfo }