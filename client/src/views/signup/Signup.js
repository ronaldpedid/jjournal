import React, { Component } from 'react';
import styles from '../signup/signup.scss';
import formStyles from '../../components/forms/forms.scss';
import { Input, Label } from '../../components/forms/FormComponents';
import axios from '../../../node_modules/axios';
import { withRouter } from 'react-router-dom';


export class SignupForm extends Component {
  render() {
    const {
      email,
      password,
      username,
      emailErr,
      passwordErr,
      usernameErr,
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
                className={usernameErr ? formStyles.error : formStyles.inputText}
                type="text"
                name="username"
                onChange={handleChange}
                value={username} />
            </div>
            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label}>Email Address</Label>
              <Input
                className={emailErr ? formStyles.error : formStyles.inputText}
                type="text"
                name="email"
                onChange={handleChange}
                value={email} />
            </div>
            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label}>Password</Label>
              <Input className={passwordErr ? formStyles.error : formStyles.inputText}
                type="password"
                onChange={handleChange}
                name="password"
                value={password} />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

@withRouter
export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      usernameErr: false,
      emailErr: false,
      passwordErr: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  validateForm() {
    const { username, email, password } = this.state;
    const usernameErr = username.length === 0;
    const emailErr = email.length === 0;
    const passwordErr = password.length === 0 || password.length < 6;

    this.setState({ usernameErr, emailErr, passwordErr })
    return !(usernameErr || emailErr || passwordErr);
  }

  async submitForm() {
    const { username, email, password } = this.state;
    const form = await axios.post('/api/account/signup', {
      username,
      email,
      password
    }).catch((error) => {
      const response = error.response
      console.log(response.data.errors)
    })
  }

  showErrorMessage() {
    return null;
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (this.validateForm()) {
      await this.submitForm();
      this.props.history.push('/');
    }
  }
  render() {
    const {
      email,
      password,
      username,
      emailErr,
      passwordErr,
      usernameErr,
    } = this.props
    return (
      <div className={styles.signupPageWrapper}>
        <SignupForm
          username={username}
          email={email}
          password={password}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          usernameErr={usernameErr}
          emailErr={emailErr}
          passwordErr={passwordErr}
        />
      </div>

    );
  }
}