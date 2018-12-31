import React, { Component } from 'react';
import { observable, computed, action, runInAction } from 'mobx';
import axios from 'axios';
import { LoginBlock, LoggedInBlock } from './Headers';

export class HeaderViewModel {
  constructor(userProfile) {
    this.userProfile = userProfile;

  }

  @computed get currentUser() {
    return this.userProfile.currentUser;
  }

  @computed get username() {
    return this.currentUser
      ? this.currentUser.username
      : '';
  }

  @computed get isLoggedIn() {
    return !!this.currentUser;
  }

  @computed get accountPoints() {
    return this.currentUser.accountPoints;
  }
  @computed get recentWeightLoss() {
    if (this.currentUser.recentWeightLoss !== 0) {
      return <h1>You have recently lost {this.currentUser.recentWeightLoss} lbs!</h1>
    } else {
      return null;
    }
  }
  @computed get numOfEntries() {
    return this.userProfile.numOfEntries;
  }
  @computed get numOfTechniques() {
    return this.userProfile.numOfTechniques;
  }
  @computed get totalSparringMatches() {
    return this.userProfile.totalSparringMatches;
  }
  @computed get totalSparringTime() {
    return this.userProfile.totalSparringTime;
  }
  @computed get currentWeight() {
    return this.userProfile.currentWeight;
  }

  @computed get loginText() {
    return this.isLoggedIn
      ? ''
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

  @computed get signUpText() {
    return this.isLoggedIn
      ? ''
      : 'Sign Up';
  }

  @computed get signUpHref() {
    return this.isLoggedIn
      ? ''
      : '/account/signup';
  }

  @computed get loggedInBlock() {
    return this.isLoggedIn
      ? <LoggedInBlock /> :
      <LoginBlock />
  }
}