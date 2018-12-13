import React, { Component } from 'react';
import styles from '../technique/technique.scss';


export class JournalTechniqueList extends Component {
  setInitialState() {
    return ({
      techniqueList: {
        techniques: {
          'technique': {
            name: 'Knee on Belly',
            positionUsed: 'Side Control'
          },
          'technique': {
            name: 'Knee on Belly',
            positionUsed: 'Side Control'
          }
        }
      }
    })
  }

  addTechnique(technique) {
    const timeStamp = (new Date()).getTime();
    this.state.technique['technique-' + timeStamp] = technique;
    this.setState({ techniques: this.state.techniques })
  }
  render() {
    return (
      <div className={styles.journalTechniqueListContainer}>
        <TechniqueList techniques={this.state.techniques} />
        <AddTechniqueForm addTechnique={this.addTechnique} />
      </div>
    )
  }
}

class TechniqueList extends Component {
  render() {
    return (
      <div className={styles.techniqueListContainer}>
        <ul>
        </ul>
      </div>
    )
  }
}

class AddTechniqueForm extends Component {
  render() {
    return (
      <div className={styles.techniqueFormContainer}>
        <form>{


        }

        </form>
      </div>
    )
  }
}