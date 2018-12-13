import React, { Component } from 'react';
import styles from './loaders.scss';

export class Loader extends Component {
  render() {
    return (
      <div
        className={styles.loaderContainer}>
        <div className={styles.loaderCopy}>
          One Moment
        </div>
      </div>
    )
  }
}