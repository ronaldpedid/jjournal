import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Input extends Component {
  render() {
    const {
      className,
      type,
      name,
      placeholder,
      value,
      onChange
    } = this.props;
    return (
      <input
        className={className}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    )

  }
}

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export class Label extends Component {
  render() {
    const {
      id,
      className
    } = this.props
    return (
      <label
        id={id}
        className={className}>
        {this.props.children}</label>
    )
  }
}

Label.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
}

//the message box class is to be used for small forms and simple contacts. For larger forms use TextBox Component
export class MessageBox extends Component {
  render() {
    const {
      className,
      name,
      value,
      onChange
    } = this.props;
    return (
      <textarea
        className={className}
        name={name}
        onChange={onChange}
        value={value}
      >
        {this.props.children}</textarea>
    )
  }
}

MessageBox.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func
}