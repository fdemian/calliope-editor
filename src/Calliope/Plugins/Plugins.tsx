import React, { lazy } from 'react';
import {ClearEditorPlugin} from '@lexical/react/LexicalClearEditorPlugin';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {LinkPlugin} from '@lexical/react/LexicalLinkPlugin';
import {ListPlugin} from '@lexical/react/LexicalListPlugin';
import {CheckListPlugin} from '@lexical/react/LexicalCheckListPlugin';
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {TablePlugin} from '@lexical/react/LexicalTablePlugin';
//import {AutoScrollPlugin} from '@lexical/react/LexicalAutoScrollPlugin';

//
const EquationsPlugin = lazy(() => import('./EquationsPlugin'));
const EditorRefPlugin = lazy(() => import('./EditorRefPlugin'));
const ListMaxIndentLevelPlugin = lazy(() => import('./ListMaxIndentLevelPlugin'));
const EmojisPlugin = lazy(() => import('./Emoji/EmojiPlugin.tsx'));
const MentionsPlugin = lazy(() => import('./Mentions/MentionsPlugin.tsx'));
const SetFormatPlugin = lazy(() => import('./SetFormatPlugin'));
const KeyboardPlugin = lazy(() => import('./KeyboardPlugin'));
const SpoilerPlugin = lazy(() => import('./SpoilerPlugin'));
const HorizontalRulePlugin = lazy(() => import('./HorizontalRulePlugin'));
const ClickableLinkPlugin = lazy(() => import('./ClickableLinkPlugin'));
const CodeHighlightPlugin = lazy(() => import('./CodeHighlightPlugin'));
const ImagesPlugin = lazy(() => import('./ImagesPlugin'));
const TwitterPlugin = lazy(() => import('./TwitterPlugin'));
const TableCellActionMenuPlugin = lazy(() => import('./TableActionMenuPlugin.tsx'));
const TableCellResizer = lazy(() => import('./TableCellResizer.tsx'));
const VideoPlugin = lazy(() => import('./VideoPlugin.ts'));
const ExcalidrawPlugin = lazy(() => import('./ExcalidrawPlugin.ts'));
const SpeechToTextPlugin = lazy(() => import('./SpeechToTextPlugin.ts'));
const CitePlugin = lazy(() => import('./CitePlugin'));


type PluginComponentProps = {
  setFormats:fn;
  internalFormat: fn;
  setInternalFormat: fn;
  editorRef: any;
  setEditorRef: fn;
  onEditorChange: fn;
  config: any;
  readOnly: boolean;
};

function EditorPlugins({
  setFormats,
  internalFormat,
  setInternalFormat,
  editorRef,
  setEditorRef,
  onEditorChange,
  config,
  readOnly
}:PluginComponentProps): JSX.Element {

  return(
  <>
    <HistoryPlugin />
    {config.autoFocus && <AutoFocusPlugin />}
    {/*<AutoScrollPlugin editorRef={editorRef} />*/}
    <ClearEditorPlugin />
    <CodeHighlightPlugin />
    <ListMaxIndentLevelPlugin />
    <LinkPlugin />
    <ListPlugin />
    <CheckListPlugin />
    <EquationsPlugin />
    <TablePlugin />
    <TableCellActionMenuPlugin />
    <TableCellResizer />
    <EmojisPlugin  />
    <ImagesPlugin />
    {!readOnly &&
      <SetFormatPlugin
        internalFormat={internalFormat}
        setInternalFormat={setInternalFormat}
        setFormats={setFormats}
      />
    }
    <OnChangePlugin onChange={onEditorChange} />
    <HistoryPlugin />
    <AutoFocusPlugin />
    <KeyboardPlugin />
    <HorizontalRulePlugin />
    <SpoilerPlugin />
    <ClickableLinkPlugin />
    <TwitterPlugin />
    <ExcalidrawPlugin />
    <VideoPlugin />
    <CitePlugin />
    <ClearEditorPlugin />
    <SpeechToTextPlugin />
    <ListMaxIndentLevelPlugin />
    <MentionsPlugin config={config.mentions} />
    <EditorRefPlugin setEditorRef={setEditorRef} />
  </>
  );
}

export default EditorPlugins;
