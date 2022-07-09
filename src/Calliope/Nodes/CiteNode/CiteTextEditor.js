import React, { useEffect } from 'react';
import {LexicalNestedComposer} from '@lexical/react/LexicalNestedComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';

const Placeholder = ({children, className }) =>(
  <div className={className || 'Placeholder__root'}>{children}</div>
)

const CiteTextEditor = ({ plugins, config, content, citeEditor, readOnly }) => {
  const Plugins = plugins;

  useEffect(() => {
   citeEditor.setReadOnly(readOnly);
  },
  [citeEditor, readOnly]);

  useEffect(() => {
    const editorState = citeEditor.parseEditorState(content);
    if (!editorState.isEmpty()) {
      citeEditor.setEditorState(editorState);
    }
  }, [content]);

  return (
  <LexicalNestedComposer
    initialEditor={citeEditor}
    initialState={content}
  >
    <RichTextPlugin
      contentEditable={
        <ContentEditable
          className="CiteNode__contentEditable"
        />
      }
    />
    {/*
    <Plugins
      readOnly={true}
      setFormats={() =>{}}
      internalFormat={{}}
      setInternalFormat={() =>{}}
      setEditorRef={() =>{}}
      editorRef={null}
      onEditorChange={() =>{}}
      config={config}
    />*/}
  </LexicalNestedComposer>
  );
}

export default CiteTextEditor;
