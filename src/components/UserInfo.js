class UserInfo {
  constructor({ userNameSelector,  userAboutSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  /** Метод возвращает объект с данными пользователя */
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent
    };
  }
 /** Метод принимает новые данные пользователя и добавляет их на страницу */ 
  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userJob.textContent = about;
  }

  setUserAvatar({ avatarLink }) {
    this._userAvatar.src = avatarLink;
  }
}

export { UserInfo }