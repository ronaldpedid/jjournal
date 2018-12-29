import React, { Component } from 'react';
import styles from './editor.scss';
import DraftTextEditor from '../../components/text_editor/Draft';

export class EditorView extends Component {
  render() {
    return (
      <div className={styles.editorWrapper}>
        <div className={styles.editorContainer}>
          <DraftTextEditor />
        </div>
      </div>
    )
  }
}