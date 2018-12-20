import React, { Component } from 'react';
import styles from '../login/login.scss';
import formStyles from '../../components/forms/forms.scss';
import { Input, Label } from '../../components/forms/FormComponents';
import { SuccessButton } from '../../components/buttons/Buttons';


export class Login extends Component {
  render() {
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.loginContainer}>
          <form action="/api/account/login" method="post">
            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label}>Username</Label>
              <Input
                className={formStyles.inputText}
                type="text"
                name="username" />
            </div>
            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label}>Password</Label>
              <Input className={formStyles.inputText} type="password" name="password" />
            </div>
            <SuccessButton>Submit</SuccessButton>
          </form>
        </div>
      </div>
    );
  }
}

