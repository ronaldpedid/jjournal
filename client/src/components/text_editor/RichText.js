import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import styles from './text.scss'
const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [{
              text: 'A sample line of text'
            }],
          },
        ],
      },
    ],
  },
})

function codeNode(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

export class RichTextContainer extends Component {
  render() {
    this.state = {
      value: initialValue
    }

    this.onChange = ({ value }) => {
      this.setState({ value });
    }

    this.onKeyDown = (event, editor, next) => {
      console.log(event.key);
      if (event.key !== '`' || !event.ctrlKey) return next();

      event.preventDefault();

      const isCode = editor.value.blocks.some(block => block.type == 'code');

      editor.setBlocks(isCode ? 'paragraph' : 'code');

    }
    return (
      <Editor
        id='blogEditor'
        className={styles.editor}
        value={this.state.value}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        renderNode={this.renderNode}
      />
    )
  }
  renderNode(props, editor, next) {
    switch (props.node.type) {
      case 'code':
        return <CodeNode {...props} />
      default:
        return next();
    }
  }
}