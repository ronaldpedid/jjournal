import { observable, computed, action, runInAction } from 'mobx';
import axios from 'axios';

export class NavigationViewModel {
  constructor(userProfile) {
    this.userProfile = userProfile;

  }

  @computed get currentUser() {
    return this.userProfile.currentUser;
  }

  @computed get hasWritePermissions() {
    return this.userProfile.hasWritePermissions;
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
  @computed get JournalText() {
    return this.isLoggedIn
      ? 'View Journal '
      : '';
  }
  @computed get JournalHref() {
    return this.isLoggedIn
      ? '/account/journal/ '
      : '';
  }
  @computed get TechniqueText() {
    return this.isLoggedIn
      ? 'View Techniques'
      : '';
  }
  @computed get TechniqueHref() {
    return this.isLoggedIn
      ? '/account/technique_book/'
      : '';
  }

  @computed get HomeText() {
    return this.isLoggedIn
      ? 'Dashboard'
      : '';
  }

  @computed get NewEntryText() {
    return this.isLoggedIn
      ? 'Record Training'
      : ''
  }
  @computed get NewEntryHref() {
    return this.isLoggedIn
      ? '/account/journal/entry/new'
      : ''
  }

  @computed get NewTechniqueText() {
    return this.isLoggedIn
      ? 'Register Technique'
      : ''
  }
  @computed get NewTechniqueHref() {
    return this.isLoggedIn
      ? '/account/technique_book/technique/new'
      : ''
  }
  @computed get NewArticleText() {
    return this.isLoggedIn && this.hasWritePermissions
      ? 'Write Article'
      : 'Become A Writer'
  }
  @computed get NewArticleHref() {
    return this.isLoggedIn && this.hasWritePermissions
      ? '/account/articles/new'
      : '/'
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