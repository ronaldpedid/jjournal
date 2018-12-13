import React, { Component } from 'react';
import styles from './arrows.scss';

export class ThreeDownArrows extends Component {
  render() {
    return (
      <div className={styles.arrowContainer}>
        <div className={styles.arrowTop}></div>
        <div className={styles.arrowMid}></div>
        <div className={styles.arrowBot}></div>
      </div>
    )
  }
}

export class TwoDownArrows extends Component {
  render() {
    return (
      <div className={styles.arrowContainer}>
        <div className={styles.arrowMid}></div>
        <div className={styles.arrowBot}></div>
      </div>
    )
  }
}

export class oneDownArrowSmall extends Component {
  render() {
    return (
      <div className={styles.arrowContainer}>
        <div className={styles.arrowBot}></div>
      </div>
    )
  }
}

export class oneDownArrowMed extends Component {
  render() {
    return (
      <div className={styles.arrowContainer}>
        <div className={styles.arrowMid}></div>
      </div>
    )
  }
}

export class oneDownArrowLarge extends Component {
  render() {
    return (
      <div className={styles.arrowContainer}>
        <div className={styles.arrowTop}></div>
      </div>
    )
  }
}

export class MoveToTop extends Component {
  render() {
    return (
      <div className={styles.arrowMoveToTop}>
        <div className={styles.arrowThin}></div>
      </div>
    )
  }
}