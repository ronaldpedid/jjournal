import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import styles from './text.scss';

class DraftTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.onChange = (evt) => this.setState({ value: evt.target.value });
  }
  render() {
    return <input value={this.state.value} onChange={this.onChange} />;
  }
}

export default class DraftTextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyles(style);
    this.onTab = this._onTab.bind(this);
    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled'
    }
    return 'not-handled'
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyles(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }
  _onTab(e) {
    e.preventDefault()
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }
  componentDidMount() {
    this.focusEditor();
  }
  render() {
    const {editorState} = this.state;
    let className = 'editor'
    var contentState = editorState.getCurrentContent();
    if(!contentState.hasText()) {
      if(contentState.getBlockMap().first.getType !== styles.unstyled){
        className = styles.hidePlaceholder
      }
    }
    return (
      <div className={styles.editorRoot}>
        <div onClick={this.focusEditor}>
          <BlockStyleControls
            editorState={this.state.editorState}
            onToggle={this.toggleBlockType} />
          <InlineStyleControls
            editorState={this.state.editorState}
            onToggle={this.toggleInlineStyle} />
          <div className={styles.editorInner}>
          <Editor
            ref={this.setEditor}
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            onTab={this.onTab}
            spellCheck={true}
          />
          </div>
        </div>
      </div>

    );
  }
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 14,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'Blockquote' : return styles.blockquote;
    default: return null;
  }
}

class StyledButton extends Component {
  constructor() {
    super();
    this.onToggle = (e) =>{
      e.preventDefault();
      this.props.onToggle(this.props.style);
    }
  }
  render() {
    return (
  <span className={this.props.active ? styles.active : styles.styledButton} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    )
  }
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' }
]

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className={styles.editorControls}>
      {BLOCK_TYPES.map((type) =>
        <StyledButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />)}
    </div>
  )
}

const INLINE_STYLES = [
  { label: 'B', style: 'BOLD' },
  { label: 'I', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' }
]

const InlineStyleControls = (props) => {
  let currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className={styles.editorControls}>
      {INLINE_STYLES.map(type =>
        <StyledButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style} />
      )}
    </div>
  )
}