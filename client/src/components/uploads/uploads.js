import React, { Component } from 'react';
import styles from './uploads.scss';
import formStyles from '../forms/forms.scss';
import { Input } from '../forms/Input';
import { SuccessButton } from '../buttons/Buttons';


export class Uploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: '',
    }
    this.handleUpload = this.handleUpload.bind(this);

  }

  handleUpload(e) {
    e.preventDefault();

    const Data = new FormData();
    Data.append('file', this.files);
    Data.append('filename', this.fileName.value);

    console.log(this.files);


    fetch('http://localhost:4000/api/upload', {
      method: 'POST',
      body: Data,
    }).then((response) => {
      return response.json();
    }).then((response) => {
      console.log(response);
      this.setState({ imageURL: `${response.files}` });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <form className={formStyles.formContainer} onSubmit={this.handleUpload}>
        <div className={formStyles.formInputGroup}>
          <Input onChange={e => this.files = e.target.files[0]} type="file" name="file" />
          <h4>Name your file.</h4>
          <Input onChange={e => this.fileName = e.target.value} type="text" name="filename" />
          <SuccessButton className={styles.uploaderBtn} type="submit">Upload</SuccessButton>
        </div>
        <div className={styles.uploaderShowcase}>
          <figure className={styles.uploaderShowcaseUploaded}>
            <img src={this.state.imageURL} alt="img" />
          </figure>
        </div>

      </form>
    )
  }


}
