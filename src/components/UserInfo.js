class UserInfo {
  constructor({ userNameSelector,  userJobSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }

  /** Метод возвращает объект с данными пользователя */
  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent
    };
  }
 /** Метод принимает новые данные пользователя и добавляет их на страницу */ 
  setUserInfo({ name, job }) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }
}

export { UserInfo }