import { observable, computed, action, runInAction } from 'mobx';
import axios from 'axios';

export class UserProfileViewModel {
  @observable currentUser = null;
  @observable loading = false;

  @action async loadUser() {
    this.loading = true;
    const user = await axios.get('/api/current_user')
    runInAction(() => {
      this.currentUser = user;
      this.currentUser.id = user.data.user._id;
      this.currentUser.username = user.data.user.username;
      this.currentUser.email = user.data.user.email;
      this.currentUser.firstName = user.data.user.firstName;
      this.currentUser.lastName = user.data.user.lastName;
      this.currentUser.profilePicture = user.data.user.profilePicture;
      this.loading = false;
    })
  }

  @computed get isLoggedIn() {
    return !!this.currentUser;
  }

  @computed get userId() {
    return this.isLoggedIn
      ? this.currentUser.id
      : ''
  }

  @computed get username() {
    return this.isLoggedIn
      ? this.currentUser.username
      : ''
  }

  @computed get email() {
    return this.isLoggedIn
      ? this.currentUser.email
      : ''
  }
  @computed get firstName() {
    return this.isLoggedIn
      ? this.currentUser.firstName
      : ''
  }
  @computed get lastName() {
    return this.isLoggedIn
      ? this.currentUser.lastName
      : ''
  }

  @computed get profilePicture() {
    return this.isLoggedIn
      ? this.currentUser.profilePicture
      : ''
  }

  @computed get accountEditRoutePath() {
    return this.isLoggedIn
      ? '/account/edit'
      : ''
  }

}