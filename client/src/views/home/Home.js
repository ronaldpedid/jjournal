import React, { Component } from 'react';
import { HomeHeader } from '../../components/headers/Headers';
import styles from '../home/home.scss';



export class Home extends Component {
  render() {
    return (
      <div className={styles.homeWrapper}>
        <HomeHeader />

      </div>
    );
  }
}

