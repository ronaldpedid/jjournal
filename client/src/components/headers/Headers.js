import React, { Component } from 'react';
import styles from './headers.scss';
import { HeaderViewModel } from './header.viewModel';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Logo } from '../svgs/logos/Logo';

export class Header extends Component {
  render() {
    return (
      <div
        className={this.props.className}>
        {this.props.children}
      </div>

    )
  }
}

@inject('userProfile')
@observer
export class LoginBlock extends Component {
  constructor(props) {
    super(props);
    this.viewModel = new HeaderViewModel(props.userProfile);
  }
  render() {
    return (
      <div className={styles.loginRow} >
        <Link className={styles.login}
          to={this.viewModel.loginHref}>
          {this.viewModel.loginText}
        </Link>
        <Link className={styles.signup}
          to={this.viewModel.signUpHref}>
          {this.viewModel.signUpText}
        </Link>
      </div >
    )
  }
};

@inject('userProfile')
@observer
export class LoggedInBlock extends Component {
  constructor(props) {
    super(props);
    this.viewModel = new HeaderViewModel(props.userProfile);
  }
  render() {
    return (
      <div className={styles.loggedInRow} >
        <h1>{this.viewModel.welcomeText}
          <span className={styles.toCapital}>
            <Link to={this.viewModel.userNameHref}>{this.viewModel.userNameText}</Link></span></h1>
        <div className={styles.statsBlock}>
          <h3>Account Statistics</h3>
          <div className={styles.statsBlockRow}>
            <ul className={styles.statsBlockCol}>
              <div className={styles.statsDataCol}>
              </div>
              <div className={styles.numBox}> {this.viewModel.accountPoints}</div>
              <li className={styles.statLabel}>Account Points</li>
              <div className={styles.numBox}>{this.viewModel.numOfEntries} </div>
              <li className={styles.statLabel}>Journal Entries</li>
              <div className={styles.numBox}>{this.viewModel.numOfTechniques}</div>
              <li className={styles.statLabel}>Registered Techniques</li>
            </ul>
            <ul className={styles.statsBlockCol}>
              <div className={styles.numBox}>{this.viewModel.totalSparringMatches}</div>
              <li className={styles.statLabel}>Sparring Matches</li>
              <div className={styles.numBox}>{this.viewModel.totalSparringTime}</div>
              <li className={styles.statLabel}>Minutes Spent Sparring</li>
              <div className={styles.numBox}>{this.viewModel.currentWeight}lbs</div>
              <li className={styles.statLabel}>Current Weight</li>
            </ul>
          </div>

        </div>
      </div >
    )
  }
};

@inject('userProfile')
@observer
export class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.viewModel = new HeaderViewModel(props.userProfile);
  }

  render() {
    return (
      <Header className={styles.headerContainer}>
        <div className={styles.headerLogoContainer}>
          <Logo />
          <div className={styles.headerCopyBlock}>
            <h1 className={styles.journey}>Your Journey. </h1>
            <h1 className={styles.journal}>Your Journal.</h1>
          </div>
          <div className={styles.userBlock}>
            {this.viewModel.loggedInBlock}
          </div>
        </div>
      </Header>
    )

  }
}

