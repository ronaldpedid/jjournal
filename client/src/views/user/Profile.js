import React, { Component } from 'react';
import styles from '../user/profile.scss';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

@inject('userProfile')
@observer
export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.viewModel = this.props.userProfile;
  }
  render() {
    return (
      <div className={styles.profileWrapper}>
        <div className={styles.userInformationContainer}>
          <h1>User Profile</h1>
          <img className={styles.profilePicture} src={this.viewModel.profilePicture} alt="Profile Picture"></img>
          <ul>
            <li>
              <span className={styles.descBold}>Name:</span> {this.viewModel.firstName} {this.viewModel.lastName}
            </li>
            <li><span className={styles.descBold}>Username:</span> {this.viewModel.username}</li>
            <li><span className={styles.descBold}>Email Address:</span> {this.viewModel.email}</li>
            <Link to={this.viewModel.accountEditRoutePath}>Edit</Link>
          </ul>
        </div>
      </div>
    );
  }
}

