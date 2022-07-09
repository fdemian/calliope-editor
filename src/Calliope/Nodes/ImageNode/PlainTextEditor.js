import React, { useEffect } from 'react';
import {LexicalNestedComposer} from '@lexical/react/LexicalNestedComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import './Placeholder.css';

const Placeholder = ({children, className }) =>(
  <div className={className || 'Placeholder__root'}>{children}</div>
)

const PlainTextEditor = ({caption, readOnly}) => {

  useEffect(() => {
    caption.setReadOnly(readOnly);
  },
  [readOnly]);

  return (
  <LexicalNestedComposer
    initialEditorState={null}
    initialEditor={caption}
  >
    <PlainTextPlugin
      contentEditable={
      <ContentEditable
        className="ImageNode__contentEditable"
      />
      }
      placeholder={
      <Placeholder className="ImageNode__placeholder">
        Enter a caption...
      </Placeholder>
      }
    />
  </LexicalNestedComposer>
  );
}

export default PlainTextEditor;
