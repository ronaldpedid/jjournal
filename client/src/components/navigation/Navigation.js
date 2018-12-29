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
    this.state = {
      navIsOpen: false
    }
    this.viewModel = new NavigationViewModel(props.userProfile);
    this.toggleNavigation = this.toggleNavigation.bind(this);

  }

  toggleNavigation() {
    console.log(this.state.navIsOpen);
    if (this.state.navIsOpen !== true) {
      this.setState({ navIsOpen: true })
    } else {
      this.setState({ navIsOpen: false })
    }
  }
  render() {
    return (

      <NavigationContainer className={styles.navigationContainer}>
        <NavigationList className={styles.navigationRow}>
          <img id={styles.triggerNavigation} onClick={this.toggleNavigation} className={styles.navLogo} src="/assets/logos/jitsujournal_logomark.png" />
          <section className={this.state.navIsOpen ? styles.navigationCol : styles.hiddenNavigation}>
            <NavigationListItem className={styles.navigationItem}>
              <Link to={this.viewModel.loginHref}>{this.viewModel.loginText}</Link>
            </NavigationListItem>
            <NavigationListItem className={styles.navigationItem}>
              <Link to={this.viewModel.signUpHref}>{this.viewModel.signUp}</Link>
            </NavigationListItem>
            <NavigationListItem className={styles.navigationItem}>
              <Link to={this.viewModel.homeHref}>{this.viewModel.HomeText}</Link>
            </NavigationListItem>
            <NavigationListItem className={styles.navigationItem}>
              <Link to={this.viewModel.NewEntryHref}>{this.viewModel.NewEntryText}</Link>
            </NavigationListItem>
            <NavigationListItem className={styles.navigationItem}>
              <Link to={this.viewModel.NewTechniqueHref}>{this.viewModel.NewTechniqueText}</Link>
            </NavigationListItem>
            <NavigationListItem className={styles.navigationItem}>
              <Link to={this.viewModel.NewArticleHref}>{this.viewModel.NewArticleText}</Link>
            </NavigationListItem>
            <NavigationListItem className={styles.navigationItem}>
              <Link to={this.viewModel.JournalHref}>{this.viewModel.JournalText}</Link>
            </NavigationListItem>
            <NavigationListItem className={styles.navigationItem}>
              <Link to={this.viewModel.TechniqueHref}>{this.viewModel.TechniqueText}</Link>
            </NavigationListItem>
          </section>
        </NavigationList>
      </NavigationContainer>
    )
  }
}


/* desktop navigation
*Stylish pop up from the left side of the window
*TODO:::::
* Create a side navigation container component
* Attach Mobx decorators / inject data
* Bring in User data
* Apply CSS / Javascript to make menu interactive
* Pops in front the left, exits stage left.
* $$$$
* Profit
*/


SiteNavigation.propTypes = {
  className: PropTypes.string
}

