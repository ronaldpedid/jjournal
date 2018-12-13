import React, { Component } from 'react';
import styles from './parallax.scss';

export class ParallaxContainer extends Component {

  render() {
    return (
      <div
        className={styles.parallaxContainer}>
        {this.props.children}
      </div>

    )
  }
}

export class ParallaxBackground extends Component {
  render() {
    return (
      <div
        className={this.props.className}>
        {this.props.children}
      </div>


    )
  }
}