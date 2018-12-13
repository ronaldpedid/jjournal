import { observable, computed, action, runInAction } from 'mobx';
import axios from 'axios';

export class NavigationViewModel {
  @observable currentUser = null;
  @observable loading = false;

  @action async loadUser() {
    this.loading = true;
    const user = await axios.get('/api/current_user')
    runInAction(() => {
      this.currentUser = user;
      this.loading = false;
    })
  }

  @computed get username() {
    return this.currentUser
      ? this.currentUser.username
      : "";
  }

  @computed get isLoggedIn() {
    return !!this.currentUser;
  }

  @computed get loginText() {
    return this.isLoggedIn
      ? 'Logout'
      : 'Login';
  }

  @computed get loginHref() {
    return this.isLoggedIn
      ? '/api/logout'
      : '/account/login';
  }

}