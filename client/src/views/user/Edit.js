import React, { Component } from 'react';
import styles from '../user/profile.scss';
import { observer, inject } from 'mobx-react';
import formStyles from '../../components/forms/forms.scss';
import { Input, Label } from '../../components/forms/FormComponents';
import axios from '../../../node_modules/axios';
import { withRouter } from 'react-router-dom';

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
      beltRank,
      beltStripesNum,
      age,
      gender,
      country,
      currentSchool,
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
                value={this.viewModel.username} />
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

            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label}>Age</Label>
              <Input
                className={formStyles.inputText}
                type="text"
                name="age"
                placeholder={this.viewModel.age}
                onChange={handleChange}
                value={age} />
            </div>

            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label}>Gender</Label>
              <Input
                className={formStyles.inputText}
                type="text"
                name="gender"
                placeholder={this.viewModel.gender}
                onChange={handleChange}
                value={gender} />
            </div>

            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label}>Belt Rank</Label>
              <Input
                className={formStyles.inputText}
                type="text"
                name="beltRank"
                placeholder={this.viewModel.beltRank}
                onChange={handleChange}
                value={beltRank} />
            </div>

            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label}>Belt Stripes</Label>
              <Input
                className={formStyles.inputText}
                type="number"
                name="beltStripesNum"
                placeholder={this.viewModel.beltStripesNum}
                onChange={handleChange}
                value={beltStripesNum} />
            </div>

            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label}>Country</Label>
              <Input
                className={formStyles.inputText}
                type="text"
                name="country"
                placeholder={this.viewModel.country}
                onChange={handleChange}
                value={country} />
            </div>

            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label}>Current School</Label>
              <Input
                className={formStyles.inputText}
                type="text"
                name="currentSchool"
                placeholder={this.viewModel.currentSchool}
                onChange={handleChange}
                value={currentSchool} />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}


@withRouter //wraps in withRouter - this.props.history.push('/') will redirect the view after ajax requests
@inject('userProfile') //injects user profile data
@observer //observes class for changes
//set the user profile from the props - this.viewModel = this.props.anyVariable
export class EditUser extends Component {
  constructor(props) {
    super(props);
    this.viewModel = this.props.userProfile;
    this.state = {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      beltRank: '',
      beltStripesNum: '',
      age: '',
      gender: '',
      country: '',
      currentSchool: ''

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
    const {
      username,
      email,
      firstName,
      lastName,
      beltRank,
      beltStripesNum,
      age,
      gender,
      country,
      currentSchool } = this.state;
    const form = await axios.put('/api/account/' + userId, {
      username,
      email,
      firstName,
      lastName,
      beltRank,
      beltStripesNum,
      age,
      gender,
      country,
      currentSchool
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
    await this.viewModel.loadUser();
    this.props.history.push('/account');
  }
  render() {
    const {
      email,
      username,
      firstName,
      lastName,
      beltRank,
      beltStripesNum,
      age,
      gender,
      country,
      currentSchool
    } = this.props
    return (
      <div className={styles.signupPageWrapper}>

        <EditUserForm
          username={username}
          email={email}
          firstName={firstName}
          lastName={lastName}
          beltRank={beltRank}
          beltStripesNum={beltStripesNum}
          age={age}
          gender={gender}
          country={country}
          currentSchool={currentSchool}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          viewModel={this.viewModel}
        />


      </div>

    );
  }
}