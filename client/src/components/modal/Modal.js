import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.scss';
const root = document.getElementById('root');
const modalRoot = document.getElementById('modal-root');


export class Modal extends Component {
  constructor(props) {
    super(props);
    this.ele = document.createElement('div');
  }
  componentDidMount() {
    modalRoot.appendChild(this.ele);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.ele);
  }
  render() {
    {
      return ReactDOM.createPortal(
        this.props.children,
        this.ele

      );
    }
  }
}

export class ModalMom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActive: false
    }
    console.log(this.state);
    this.toggleModalState = this.toggleModalState.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
  }

  handleMouseClick() {
    console.log('clickered');
    this.setState(this.toggleModalState);
  }
  toggleModalState(state) {
    modalRoot.classList.toggle(styles.bgDimmer);
    return {
      modalActive: !state.modalActive
    };
  }
  render() {
    return (

      <div className={styles.modalContainer}>
        <Modal>
          <div className={this.state.modalActive ? `${styles.modalActive}` : `${styles.modalSleeping}`}>
            <div className={styles.modalInnerClose}>
              <ToggleModalButton className={styles.modalClose} type="button" onClick={this.handleMouseClick}>X</ToggleModalButton>
            </div>
            {this.props.children}
          </div>
        </Modal>
        <ToggleModalButton className={styles.modalOpen} type="button" onClick={this.handleMouseClick}>{!this.state.modalActive ? 'Open' : 'Close'}</ToggleModalButton>
      </div>

    )
  }
}

class ToggleModalButton extends Component {
  render() {
    return (
      <button className={this.props.className} type={this.props.type} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    )
  }
}
