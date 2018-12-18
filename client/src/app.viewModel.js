import { observable, computed, action, runInAction } from 'mobx';
import axios from 'axios';

export class AppViewModel {
  @observable currentUser = null;
  @observable loading = false;

  @computed get isLoggedIn() {
    return !!this.currentUser;
  }

  @computed get userID() {
    return this.isLoggedIn
      ? this.currentUser.id
      : ''
  }

  @computed get accountRoutePath() {
    return this.isLoggedIn
      ? '/account/' + this.currentUser.id
      : ''
  }
  @computed get accountEditRoutePath() {
    return this.isLoggedIn
      ? '/account/' + this.currentUser.id + '/edit'
      : ''
  }

}