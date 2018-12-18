import { observable, computed, action, runInAction } from 'mobx';
import axios from 'axios';

export class NavigationViewModel {
  constructor(userProfile) {
    this.userProfile = userProfile;

  }

  @computed get currentUser() {
    return this.userProfile.currentUser;
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
      ? '/api/account/logout'
      : '/account/login';
  }

  @computed get userNameText() {
    return this.isLoggedIn
      ? this.username + '!'
      : '';
  }

  @computed get userNameHref() {
    return this.isLoggedIn
      ? '/account/'
      : '';
  }

  @computed get dashboardText() {
    return this.isLoggedIn
      ? 'Dashboard'
      : '';
  }

  @computed get welcomeText() {
    return this.isLoggedIn
      ? 'Welcome, '
      : '';
  }

  @computed get HomeText() {
    return this.isLoggedIn
      ? 'Home'
      : '';
  }


  @computed get homeHref() {
    return this.isLoggedIn
      ? '/'
      : '';
  }

  @computed get dashboardHref() {
    return this.isLoggedIn
      ? '/account/dashboard'
      : '';
  }


  @computed get signUp() {
    return this.isLoggedIn
      ? ''
      : 'Sign Up';
  }

  @computed get signUpHref() {
    return this.isLoggedIn
      ? ''
      : '/account/signup';
  }
}