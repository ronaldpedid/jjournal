import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './navigation.scss';
import { NavigationViewModel } from './navigation.viewModel';
import { observer, inject } from 'mobx-react';


class NavigationContainer extends Component {
  render() {
    return (
      <div className={styles.navigationContainer}>
        {this.props.children}
      </div>
    )
  }
}

class NavigationList extends Component {
  render() {
    return (
      <ul className={this.props.className}>
        {this.props.children}
      </ul>
    )
  }
}

class NavigationListItem extends Component {
  render() {
    return (
      <li className={this.props.className}>
        {this.props.children}</li>
    )
  }
}
@inject('userProfile')
@observer
export class SiteNavigation extends Component {
  constructor(props) {
    super(props);
    this.viewModel = new NavigationViewModel(props.userProfile);
  }
  render() {
    return (
      <NavigationContainer className={styles.navigationContainer}>
        <NavigationList className={styles.navigationRow}>
          <NavigationListItem className={styles.navigationItem}>
            {this.viewModel.welcomeText}<Link to={this.viewModel.userNameHref}> {this.viewModel.userNameText}</Link>
          </NavigationListItem>
          <NavigationListItem className={styles.navigationItem}>
            <Link to={this.viewModel.homeHref}>{this.viewModel.HomeText}</Link>
          </NavigationListItem>
          <NavigationListItem className={styles.navigationItem}>
            <Link to={this.viewModel.dashboardHref}>{this.viewModel.dashboardText}</Link>
          </NavigationListItem>
          <NavigationListItem className={styles.navigationItem}>
            <Link to={this.viewModel.loginHref}>{this.viewModel.loginText}</Link>
          </NavigationListItem>
          <NavigationListItem className={styles.navigationItem}>
            <Link to={this.viewModel.signUpHref}>{this.viewModel.signUp}</Link>
          </NavigationListItem>
        </NavigationList>
      </NavigationContainer>
    )
  }
}


export class SubNavigation extends Component {
  render() {
    return (
      <NavigationContainer className={styles.navigationContainerSubnav}>
        <NavigationList className={styles.navigationRowSubnav}>
          <NavigationListItem className={styles.navigationItemSubnav}><Link to='/account/journal/entry/new'>Create Journal Entry</Link></NavigationListItem>
          <NavigationListItem className={styles.navigationItemSubnav}><Link to='/account/technique_book/technique/new'>Add Technique</Link></NavigationListItem>
          <NavigationListItem className={styles.navigationItemSubnav}><Link to='/account/signup'>View All</Link></NavigationListItem>
        </NavigationList>
      </NavigationContainer>
    )

  }
}



SiteNavigation.propTypes = {
  className: PropTypes.string
}

SubNavigation.propTypes = {
  className: PropTypes.string
}