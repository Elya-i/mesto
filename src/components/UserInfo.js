class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  /** Метод, возвращаюший объект с данными пользователя */
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._userAvatar.src,
      userId: this._userId,
    }
  }
  
  /** Метод, принимающий новые данные пользователя и добавляет их на страницу */ 
  setUserInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
    this._userId = _id;
  }
}

export { UserInfo }