import React, { Component } from 'react';
import styles from '../user/profile.scss';
import { observer, inject } from 'mobx-react';
import formStyles from '../../components/forms/forms.scss';
import { Input, Label } from '../../components/forms/FormComponents';
import axios from '../../../node_modules/axios';

@observer
class EditUserForm extends Component {
  get viewModel() {
    return this.props.viewModel;
  }
  render() {
    const {
      email,
      username,
      firstName,
      lastName,
      profilePic,
      handleChange,
      handleSubmit
    } = this.props;

    return (
      <div className={styles.signupWrapper}>
        <div className={styles.signupContainer}>
          <form onSubmit={handleSubmit} className={formStyles.container}>
            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label}>Username</Label>
              <Input
                className={formStyles.inputText}
                type="text"
                name="username"
                onChange={handleChange}
                placeholder={this.viewModel.username}
                value={username} />
            </div>
            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label}>Email Address</Label>
              <Input
                className={formStyles.inputText}
                type="text"
                name="email"
                placeholder={this.viewModel.email}
                onChange={handleChange}
                value={email} />
            </div>
            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label}>First Name</Label>
              <Input
                className={formStyles.inputText}
                type="text"
                name="firstName"
                placeholder={this.viewModel.firstName}
                onChange={handleChange}
                value={firstName} />
            </div>
            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label}>Last Name</Label>
              <Input
                className={formStyles.inputText}
                type="text"
                name="lastName"
                placeholder={this.viewModel.lastName}
                onChange={handleChange}
                value={lastName} />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

@inject('userProfile')
@observer
export class EditUser extends Component {
  constructor(props) {
    super(props);
    this.viewModel = this.props.userProfile;
    this.state = {
      username: '',
      email: '',
      firstName: '',
      lastName: ''

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  validateForm() {
    return true
  }

  async submitForm() {
    const userId = this.viewModel.userId;
    console.log('userid: ' + userId);
    const { username, email, firstName, lastName } = this.state;
    const form = await axios.put('/api/account/' + userId, {
      username,
      email,
      firstName,
      lastName
    }).catch((error) => {
      const response = error.response
      console.log(response.data.errors)
    })
  }

  showErrorMessage() {
    return console.log('Something went wrong.');
  }

  async handleSubmit(e) {
    e.preventDefault();
    await this.submitForm();
    // window.location = "/account"

  }
  render() {
    const {
      email,
      username,
      firstName,
      lastName
    } = this.props
    return (
      <div className={styles.signupPageWrapper}>

        <EditUserForm
          username={username}
          email={email}
          firstName={firstName}
          lastName={lastName}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          viewModel={this.viewModel}
        />


      </div>

    );
  }
}