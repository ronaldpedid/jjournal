import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';
import styles from './text.scss';


export default class DraftTextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
  }
  render() {
    return (
      <div className={styles.editable}>
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
      </div>

    );
  }
}
