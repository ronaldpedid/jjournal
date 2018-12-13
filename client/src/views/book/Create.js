import React, { Component } from 'react';
import styles from '../journal/journal.scss';
import formStyles from '../../components/forms/forms.scss';
import { SiteNavigation } from '../../components/navigation/Navigation';
import { Input, Label, MessageBox } from '../../components/forms/FormComponents';
import axios from '../../../node_modules/axios';
import _ from 'lodash';

export class CreateTechniqueForm extends Component {
  render() {
    const {
      name,
      positionFrom,
      desc,
      videoUrl,
      handleChange,
      handleSubmit,
      nameErr,
      positionFromErr,
      descErr,
      videoUrlErr
    } = this.props;
    return (
      <div className={styles.journalEntryWrapper}>
        <div className={styles.journalEntryContainer}>
          <form onSubmit={handleSubmit} className={formStyles.container}>
            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label}>Name of Technique</Label>
              <Input
                name="name"
                type="text"
                onChange={handleChange}
                className={nameErr ? formStyles.error : formStyles.inputText}
                value={name} /></div>
            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label}>Where is the technique applied from?</Label>
              <Input
                name="positionFrom"
                type="text"
                className={positionFromErr ? formStyles.error : formStyles.inputText}
                onChange={handleChange}
                value={positionFrom} /></div>
            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label}>Please provide a discription of your technique.</Label>
              <Input
                name="desc"
                type="text"
                onChange={handleChange}
                className={descErr ? formStyles.error : formStyles.inputText}
                value={desc} /></div>
            <div className={formStyles.formInputGroup}>
              <Label className={formStyles.label}>If you wish add a url for the video.</Label>
              <Input
                name="videoUrl"
                type="file"
                className={videoUrlErr ? formStyles.error : formStyles.inputText}
                onChange={handleChange}
                value={videoUrl} />
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export class TechniqueForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      positionFrom: '',
      desc: '',
      videoUrl: '',
      nameErr: false,
      positionFromErr: false,
      descErr: false,
      videoUrlErr: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  validateForm() {
    //set data to the state and check for errors returning if there is no error
    const { name, positionFrom, desc, videoUrl } = this.state;
    const nameErr = name.length === 0;
    const positionFromErr = positionFrom.length === 0;
    const descErr = desc.length === 0;

    //sets the state of the error should one occur
    this.setState({ nameErr, positionFromErr, descErr })
    return !(
      nameErr | positionFromErr | descErr
    );
  }

  //take the validated form and submit it to the server
  async submitForm() {
    const {
      name,
      positionFrom,
      desc,
      videoUrl
    } = this.state;
    const form = await axios.post('/api/technique_book/technique/new', {
      name,
      positionFrom,
      desc,
      videoUrl
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
      name,
      positionFrom,
      desc,
      videoUrl
    } = this.props
    return (
      <div className={styles.journalEntryCreateWrapper}>
        <SiteNavigation />
        <CreateTechniqueForm
          name={name}
          positionFrom={positionFrom}
          desc={desc}
          videoUrl={videoUrl}
        />
      </div>

    );
  }
}