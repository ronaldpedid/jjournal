import React, { Component } from 'react';
import styles from './headers.scss'


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


export class HomeHeader extends Component {
  render() {
    return (
      <Header className={styles.headerContainer}>
        <div className={styles.headerLogoContainer}>
          LOGO HERE
      </div>
        <div className={styles.headerBodyContainer}>
          <h1>Jitsu Journal</h1>
        </div>
      </Header>
    )

  }
}

