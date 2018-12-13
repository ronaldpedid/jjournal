import React, { Component } from 'react';
import styles from '../journal/journal.scss';
import formStyles from '../../components/forms/forms.scss';
import { SiteNavigation } from '../../components/navigation/Navigation';
import { Input, Label, MessageBox } from '../../components/forms/FormComponents';
import axios from '../../../node_modules/axios';
import _ from 'lodash';


export class CreateEntryForm extends Component {
  render() {
    const {
      rolls,
      rollTime,
      weightPre,
      weightPost,
      reflections,
      rollsErr,
      rollTimeErr,
      weightPreErr,
      weightPostErr,
      reflectionsErr,
      handleChange,
      handleSubmit
    } = this.props;
    return (
      <div className={styles.journalEntryWrapper}>
        <div className={styles.journalEntryContainer}>
          <form onSubmit={handleSubmit} className={formStyles.container}>
            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label} name="rolls">How many sparring matches have you done today?</Label>
              <Input
                name="rolls"
                type="number"
                onChange={handleChange}
                className={rollsErr ? formStyles.error : formStyles.inputText}
                value={rolls} /></div>
            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label} name="rollTime">How long was each match?</Label>
              <Input
                name="rollTime"
                type="number"
                className={rollTimeErr ? formStyles.error : formStyles.inputText}
                onChange={handleChange}
                value={rollTime} /></div>
            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label} name="weightPre">Please provide your weight before your sparring matches.</Label>
              <Input
                name="weightPre"
                type="number"
                onChange={handleChange}
                className={weightPreErr ? formStyles.error : formStyles.inputText}
                value={weightPre} /></div>
            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label} name="weightPost">Please provide your weight after your sparring matches.</Label>
              <Input
                name="weightPost"
                type="number"
                className={weightPostErr ? formStyles.error : formStyles.inputText}
                onChange={handleChange}
                value={weightPost} />
            </div>
            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label} name="reflections">Additional comments or reflections on today's training.</Label>
              <MessageBox
                name="reflections"
                type="text"
                className={reflectionsErr ? formStyles.error : formStyles.inputText}
                onChange={handleChange}
                value={reflections}>
              </MessageBox>
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}


export class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rolls: '',
      rollTime: '',
      weightPre: '',
      weightPost: '',
      reflections: '',
      rollsErr: false,
      rollTimeErr: false,
      weightPreErr: false,
      weightPostErr: false,
      reflectionsErr: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  validateForm() {
    //set data to the state and check for errors returning if there is no error
    const { rolls, rollTime, weightPre, weightPost, reflections } = this.state;
    const rollsErr = rolls.length === 0;
    const rollTimeErr = rollTime.length === 0;
    const weightPreErr = weightPre.length === 0;
    const weightPostErr = weightPost.length === 0;
    const reflectionsErr = reflections.length === 0;

    //sets the state of the error should one occur
    this.setState({ rollsErr, rollTimeErr, weightPreErr, weightPostErr, reflectionsErr })
    return !(
      rollsErr ||
      rollTimeErr ||
      weightPreErr ||
      weightPostErr ||
      reflectionsErr
    );
  }

  //take the validated form and submit it to the server
  async submitForm() {
    const { rolls, rollTime, weightPre, weightPost, reflections } = this.state;
    const form = await axios.post('/api/journal/entry/new', {
      rolls,
      rollTime,
      weightPre,
      weightPost,
      reflections
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
      window.location = "/"
    }
  }
  render() {
    const {
      rolls,
      rollTime,
      weightPre,
      weightPost,
      reflections,
      rollsErr,
      rollTimeErr,
      weightPreErr,
      weightPostErr,
      reflectionsErr
    } = this.props
    return (
      <div className={styles.journalEntryCreateWrapper}>
        <SiteNavigation />
        <CreateEntryForm
          rolls={rolls}
          rollTime={rollTime}
          weightPre={weightPre}
          weightPost={weightPost}
          reflections={reflections}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          rollsErr={rollsErr}
          rollTimeErr={rollTimeErr}
          weightPreErr={weightPreErr}
          weightPostErr={weightPostErr}
          reflectionsErr={reflectionsErr}
        />
      </div>

    );
  }
}