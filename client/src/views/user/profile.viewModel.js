import { observable, computed, action, runInAction } from 'mobx';
import _ from 'lodash';
import axios from 'axios';

export class UserProfileViewModel {
  @observable currentUser = null;
  @observable loading = false;

  @action async loadUser() {
    this.loading = true;
    const result = await axios.get('/api/current_user')
    runInAction(() => {
      const user = result.data.user;
      user.id = user._id;
      this.currentUser = result.data.user;
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

  @computed get entries() {
    return this.isLoggedIn
      ? this.currentUser.entries
      : ''
  }

  @computed get techniques() {
    return this.isLoggedIn
      ? this.currentUser.techniques
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
  @computed get hasWritePermissions() {
    return this.isLoggedIn
      ? this.currentUser.hasWritePermissions
      : ''
  }

  @computed get profilePicture() {
    return this.isLoggedIn
      ? this.currentUser.profilePicture
      : ''
  }
  @computed get accountPoints() {
    return this.isLoggedIn
      ? this.currentUser.accountPoints
      : ''
  }
  @computed get numOfEntries() {
    return this.isLoggedIn
      ? this.currentUser.numOfEntries
      : ''
  }
  @computed get numOfTechniques() {
    return this.isLoggedIn
      ? this.currentUser.numOfTechniques
      : ''
  }
  @computed get totalSparringMatches() {
    return this.isLoggedIn
      ? this.currentUser.totalSparringMatches
      : ''
  }
  @computed get totalSparringTime() {
    return this.isLoggedIn
      ? this.currentUser.totalSparringTime
      : ''
  }
  @computed get currentWeight() {
    return this.isLoggedIn
      ? this.currentUser.currentWeight
      : ''
  }

  @computed get accountEditRoutePath() {
    return this.isLoggedIn
      ? '/account/edit'
      : ''
  }

}