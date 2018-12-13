import React, { Component } from 'react';
import styles from './buttons.scss'

export class PrimaryButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      isHovering: false,
    }
  }
  render() {
    return (
      <button
        className={this.props.className}
        type={this.props.type}
        style={this.style()}
        onClick={this.props.onClick}
        onMouseDown={() => this.setState({ isActive: true })}
        onMouseUp={() => this.setState({ isActive: false })}
        onMouseEnter={() => this.setState({ isHovering: true })}
        onMouseLeave={() => this.setState({ isHovering: false })}
      >
        {this.props.children}
      </button>
    )
  }
  style() {
    return {
      backgroundColor: this.state.isActive ? 'red' : null,
      boxShadow: this.state.isHovering ? '.3rem .3rem .1rem #333' : '0 0 0',
      opacity: this.state.isActive || this.state.isHovering ? '.7' : '1'
    }
  }
}

export class SuccessButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      isHovering: false,
    }
  }
  render() {
    return (
      <button
        onClick={this.props.onClick}
        type={this.props.type}
        style={this.style()}
        className={this.props.className}
        onMouseDown={() => this.setState({ isActive: true })}
        onMouseUp={() => this.setState({ isActive: false })}
        onMouseEnter={() => this.setState({ isHovering: true })}
        onMouseLeave={() => this.setState({ isHovering: false })}

      >{this.props.children}
      </button>
    )
  }

  style() {
    return {
      backgroundColor: this.state.isActive ? 'navy' : null,
      boxShadow: this.state.isHovering ? '.3rem .3rem .1rem #333' : '0 0 0',
      opacity: this.state.isActive || this.state.isHovering ? '.7' : '1'
    }
  }
}


export class DangerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      isHovering: false,
    }
  }
  render() {
    return (
      <div
        onClick={this.handleClick}
        type={this.props.type}
        style={this.style()}
        className={this.props.className}
        onMouseDown={() => this.setState({ isActive: true })}
        onMouseUp={() => this.setState({ isActive: false })}
        onMouseEnter={() => this.setState({ isHovering: true })}
        onMouseLeave={() => this.setState({ isHovering: false })}

      >{this.props.children}
      </div>
    )
  }
  handleClick() {
    alert('button hath been clicked.');
  }
  style() {
    return {
      backgroundColor: this.state.isActive ? 'orange' : null,
      boxShadow: this.state.isHovering ? '.3rem .3rem .1rem #333' : '0 0 0',
      opacity: this.state.isActive || this.state.isHovering ? '.7' : '1'
    }
  }
}

export class WarningButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      isHovering: false,
    }
  }
  render() {
    return (
      <div
        onClick={this.handleClick}
        style={this.style()}
        className={this.props.className}
        onMouseDown={() => this.setState({ isActive: true })}
        onMouseUp={() => this.setState({ isActive: false })}
        onMouseEnter={() => this.setState({ isHovering: true })}
        onMouseLeave={() => this.setState({ isHovering: false })}

      >{this.props.children}
      </div>
    )
  }
  handleClick() {
    alert('button hath been clicked.');
  }
  style() {
    return {
      backgroundColor: this.state.isActive ? 'darkred' : null,
      boxShadow: this.state.isHovering ? '.3rem .3rem .1rem #333' : '0 0 0',
      opacity: this.state.isActive || this.state.isHovering ? '.7' : '1'
    }
  }
}

export class SubmitButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      isHovering: false,
    }
  }
  render() {
    this.handleSubmit = this.handleSubmit.bind(this);
    return (
      <div
        className={styles.PrimaryButton}
        onClick={this.handleSubmit}
        type={this.props.type}
        style={this.style()}
        onMouseDown={() => this.setState({ isActive: true })}
        onMouseUp={() => this.setState({ isActive: false })}
        onMouseEnter={() => this.setState({ isHovering: true })}
        onMouseLeave={() => this.setState({ isHovering: false })}
      >
        {this.props.children}
      </div>
    )
  }
  async handleSubmit(e) {
    e.preventDefault();
    console.log('submitted~');
  }
  style() {
    return {
      backgroundColor: this.state.isActive ? '#1d6d1d' : null,
      boxShadow: this.state.isHovering ? '.3rem .3rem .1rem #333' : '0 0 0',
      opacity: this.state.isActive || this.state.isHovering ? '.7' : '1'
    }


  }

}

export class ButtonText extends Component {
  render() {
    return (
      <p
        className={styles.buttonText}
      >
        {this.props.children}
      </p>
    )
  }

}


