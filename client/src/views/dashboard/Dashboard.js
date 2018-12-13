import React, { Component } from 'react';
import styles from './dashboard.scss';
import { SiteNavigation, SubNavigation } from '../../components/navigation/Navigation';


export class DashboardView extends Component {
  render() {
    return (
      <div className={styles.dashboardContainer}>
        <SiteNavigation />
        <div className={styles.dashboardContentContainer}>
          <SubNavigation />
        </div>
      </div>
    )
  }
}