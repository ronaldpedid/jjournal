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
      this.currentUser.accountPoints = user.data.user.accountPoints;
      this.currentUser.hasWritePermissions = user.data.user.hasWritePermissions;
      this.currentUser.numOfEntries = user.data.user.numOfEntries;
      this.currentUser.numOfTechniques = user.data.user.numOfTechniques;
      this.currentUser.totalSparringMatches = user.data.user.totalSparringMatches;
      this.currentUser.totalSparringTime = user.data.user.totalSparringTime;
      this.currentUser.currentWeight = user.data.user.currentWeight;
      this.currentUser.age = user.data.user.age;
      this.currentUser.gender = user.data.user.gender;
      this.currentUser.beltRank = user.data.user.beltRank
      this.currentUser.beltStripesNum = user.data.user.beltStripesNum;
      this.currentUser.country = user.data.user.country;
      this.currentUser.currentSchool = user.data.user.currentSchool;
      this.currentUser.journal = user.data.user.journal;
      this.currentUser.isAdmin = user.data.user.isAdmin;
      this.currentUser.isModerator = user.data.user.isModerator;
      this.currentUser.private = user.data.user.private;
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