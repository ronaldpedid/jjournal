import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './book.scss';
import _ from 'lodash';
import { Logo } from '../../components/svgs/logos/Logo';



@inject('userTechniques')
@observer
export class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteAttempt: false
    }
    this.viewModel = this.props.userTechniques;
    this.toggleDeleteAlert = this.toggleDeleteAlert.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  toggleDeleteAlert() {
    console.log(this.state.deleteAttempt);
    if (this.state.deleteAttempt !== true) {
      this.setState({ deleteAttempt: true })
    } else {
      this.setState({ deleteAttempt: false })
    }
  }

  async submitForm(techniqueId) {
    const url = `http://dev.jitsujournal.com/api/technique_book/${techniqueId}`
    const form = await axios.delete(url)
      .then(res => {
        this.setState(previousState => {
          return {
            technique: previousState.technique.filter(t => t.id !== technique.id)
          }
        })
      })
      .catch((error) => {
        const response = error.response
        console.log(response.data.errors)
      })
  }

  async handleSubmit(e) {
    e.preventDefault();
    await this.submitForm();
    // window.location = '/';
  }
  render() {
    const renderedTechniques = this.viewModel.techniques.map(technique => {
      return <div><Technique
        key={technique._id}
        technique={technique}
        state={this.state}
        toggleDeleteAlert={this.toggleDeleteAlert}
        handleSubmit={this.handleSubmit} />


      </div>

    });
    return (
      <div className={styles.techniquesContainer}>

        <div className={styles.logoHeader}>
          <Logo />

        </div>
        <div className={styles.techniqeBlockContainer}>
          {renderedTechniques}

        </div>
      </div>)
  }
};



const Technique = ({ technique, state, toggleDeleteAlert, handleSubmit }) => {
  return <div key={technique._id}>
    <ul className={styles.techniqueBlock}>
      <li><h1>{technique._id}</h1></li>
      <li><h1>{technique.name}</h1></li>
      <li>Can be executed from: {technique.positionFrom}</li>
      <li>{technique.desc !== '' ? technique.desc : 'Please provide a description of your technique.'}</li>

      {state.deleteAttempt ?
        <div className={styles.alertDelete}>
          <p>You are about to delete this technique. This is irrevisible. Do you wish to continue?</p>
          <form onSubmit={handleSubmit}>
            <div className={styles.editRow}>
              <button className={styles.editRowBtnDestroy}>DELETE!</button>
              <a onClick={toggleDeleteAlert} className={styles.editRowBtnClose}>CLOSE</a>
            </div>
          </form>


        </div> : ''}
    </ul>
    <div className={styles.videoContainer}>
      <iframe width="560" height="315" src={technique.videoUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
    <div className={styles.editRow}>
      <div className={styles.editRowBtnEdt}><p>Edit</p></div>
      <div onClick={toggleDeleteAlert} className={styles.editRowBtnDel}><p>Delete</p></div>
    </div>
  </div>
}

