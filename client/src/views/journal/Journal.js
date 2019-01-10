import React, { Component } from 'react'
import { observer, inject } from 'mobx-react';

@inject('userJournal')
@observer
export class Journal extends Component {
  constructor(props) {
    super(props);
    this.viewModel = this.props.userJournal;
  }
  render() {
    return (
      <div>
        <h1>Journals</h1>
      </div>
    )
  }
}
