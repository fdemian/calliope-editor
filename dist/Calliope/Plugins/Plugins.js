import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { lazy } from 'react';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
//import {AutoScrollPlugin} from '@lexical/react/LexicalAutoScrollPlugin';
//
const EquationsPlugin = lazy(() => import('./EquationsPlugin'));
const EditorRefPlugin = lazy(() => import('./EditorRefPlugin'));
const ListMaxIndentLevelPlugin = lazy(() => import('./ListMaxIndentLevelPlugin'));
const EmojisPlugin = lazy(() => import('./Emoji/EmojiPlugin.tsx'));
const MentionsPlugin = lazy(() => import('./EquationsPlugin'));
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
function EditorPlugins({ setFormats, internalFormat, setInternalFormat, editorRef, setEditorRef, onEditorChange, config, readOnly }) {
    return (_jsxs(_Fragment, { children: [_jsx(HistoryPlugin, {}), config.autoFocus && _jsx(AutoFocusPlugin, {}), _jsx(ClearEditorPlugin, {}), _jsx(CodeHighlightPlugin, {}), _jsx(ListMaxIndentLevelPlugin, {}), _jsx(LinkPlugin, {}), _jsx(ListPlugin, {}), _jsx(CheckListPlugin, {}), _jsx(EquationsPlugin, {}), _jsx(TablePlugin, {}), _jsx(TableCellActionMenuPlugin, {}), _jsx(TableCellResizer, {}), _jsx(EmojisPlugin, {}), _jsx(ImagesPlugin, {}), !readOnly &&
                _jsx(SetFormatPlugin, { internalFormat: internalFormat, setInternalFormat: setInternalFormat, setFormats: setFormats }), _jsx(OnChangePlugin, { onChange: onEditorChange }), _jsx(HistoryPlugin, {}), _jsx(AutoFocusPlugin, {}), _jsx(KeyboardPlugin, {}), _jsx(HorizontalRulePlugin, {}), _jsx(SpoilerPlugin, {}), _jsx(ClickableLinkPlugin, {}), _jsx(TwitterPlugin, {}), _jsx(ExcalidrawPlugin, {}), _jsx(VideoPlugin, {}), _jsx(CitePlugin, {}), _jsx(ClearEditorPlugin, {}), _jsx(SpeechToTextPlugin, {}), _jsx(ListMaxIndentLevelPlugin, {}), _jsx(MentionsPlugin, { config: config.mentions }), _jsx(EditorRefPlugin, { setEditorRef: setEditorRef })] }));
}
export default EditorPlugins;
