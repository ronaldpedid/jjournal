import React, { Component } from 'react';
import styles from './forms.scss';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Input } from './Input';
import { Label } from './Label';
import { MessageBox } from './Textarea';
import { ButtonText, SubmitButton } from '../buttons/Buttons';

export class FormMarkUpTemplate extends Component {
  render() {
    const {
      name,
      phone,
      email,
      message,
      nameErr,
      phoneErr,
      emailErr,
      messageErr,
      handleSubmit,
      handleChange,
      file

    } = this.props;
    return (
      <form className={styles.formContainer}>
        <div className={styles.formInputGroup}>
          <Label className={styles.label}>Name</Label>
          <Input
            className={styles.inputText}
            type="text"
            name="name"
            onChange={handleChange}
            value={name} />
        </div>
        <div className={styles.formInputGroup}>
          <Label className={styles.label}>Phone Number</Label>
          <Input
            className={styles.inputNumber}
            type="number"
            name="phone"
            placeholder="(555)555-5555"
            onChange={handleChange}
            value={phone} />
        </div>
        <div className={styles.formInputGroup}>
          <Label className={styles.label}>Email Address</Label>
          <Input
            className={styles.inputEmail}
            type="email"
            name="email"
            onChange={handleChange}
            value={email} />
        </div>
        <div className={styles.formInputMessagebox}>
          <MessageBox
            className={styles.messageBox}
            name="message"
            onChange={handleChange}
            value={message}
          ></MessageBox>
        </div>
        <SubmitButton
          className={styles.submitBtn}
          type="submit"
          onClick={handleSubmit}>
          <ButtonText>Send</ButtonText>
        </SubmitButton>
      </form>
    )
  }
}

FormMarkUpTemplate.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  message: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  nameErr: PropTypes.bool,
  emailErr: PropTypes.bool,
  phoneErr: PropTypes.bool,
  messageErr: PropTypes.bool
};


export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
      message: '',
      nameErr: false,
      phoneErr: false,
      messageErr: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  validateForm() {
    const { name, email, phone, message } = this.state;
    const nameErr = name.length === 0;
    const phoneErr = phone.length === 0 || phone.length < 7;
    const emailErr = email.length === 0;
    const messageErr = message.length === 0 || message.length > 1000;

    this.setState({ nameErr, emailErr, phoneErr, messageErr })
    return !(nameErr || emailErr || phoneErr || messageErr);
  }

  async submitForm() {
    const { name, email, phone, message } = this.state;
    const form = await axios.post('/api/form', {
      name,
      email,
      phone,
      message
    }).catch((error) => {
      const response = error.response
      console.log(response.data.errors)
    })
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (this.validateForm()) {
      await this.submitForm();
      window.location = "back"
    }
    else {
      console.log('submitted');

    }
    console.log('submits');
  }
  render() {
    const {
      name,
      email,
      phone,
      message,
      nameErr,
      emailErr,
      phoneErr,
      messageErr
    } = this.state;
    return (

      <FormMarkUpTemplate
        name={name}
        email={email}
        phone={phone}
        message={message}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        nameErr={nameErr}
        emailErr={emailErr}
        phoneErr={phoneErr}
        messageErr={messageErr}
      />

    );
  }
}
