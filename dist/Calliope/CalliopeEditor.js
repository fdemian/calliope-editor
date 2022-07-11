import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useImperativeHandle, createContext } from "react";
import { CLEAR_EDITOR_COMMAND } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import EditorNodes from './Nodes/Nodes';
import EditorPlugins from './Plugins/Plugins';
import EDITOR_COMMANDS from './Plugins/Commands';
import { createPortal } from 'react-dom';
import FloatingLinkEditor from './UI/Link/FloatingLinkEditor';
import theme from './editorTheme';
import './CalliopeEditor.css';
/* canUndo: inte, canRedo: false, */
const INITIAL_FORMATS = {
    blockType: 'paragraph',
    selectedElementKey: null,
    isLink: false,
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isStrikethrough: false,
    isSubscript: false,
    isSuperscript: false,
    isCode: false,
    canUndo: false,
    canRedo: false,
    isRTL: false,
    codeLanguage: '',
    fontSize: '15px',
    fontColor: '#000',
    bgColor: '#fff',
    fontFamily: 'Arial'
};
export const CalliopeContext = createContext();
const Editor = ({ config, containerRef, setFormats }) => {
    const [internalFormat, setInternalFormat] = useState(INITIAL_FORMATS);
    const initialConfig = {
        nodes: EditorNodes,
        onError: config.onError,
        readOnly: config.readOnly,
        editorState: config.initialState,
        theme,
    };
    const [editorRef, setEditorRef] = useState(null);
    const editorStateRef = useRef();
    const pluginConfig = {
        ...config,
        nodes: EditorNodes,
        plugins: EditorPlugins
    };
    const clear = () => {
        if (editorRef) {
            editorRef.dispatchCommand(CLEAR_EDITOR_COMMAND);
            editorRef.focus();
        }
    };
    const getContent = () => {
        return JSON.stringify(editorStateRef.current);
    };
    const executeCommand = (name, props) => {
        if (!editorRef)
            return;
        const selectedCommand = EDITOR_COMMANDS.find(c => c.name === name);
        if (selectedCommand === undefined)
            return;
        const COMMAND_TO_DISPATCH = selectedCommand.command;
        if (selectedCommand.directCommand) {
            editorRef.dispatchCommand(COMMAND_TO_DISPATCH, props);
        }
        else {
            COMMAND_TO_DISPATCH(editorRef, internalFormat, props);
        }
    };
    const onEditorChange = (editorState) => editorStateRef.current = editorState;
    useImperativeHandle(containerRef, () => {
        return {
            clear: clear,
            getContent: getContent,
            executeCommand: executeCommand
        };
    });
    return (_jsx("span", { className: "editor-shell", children: _jsx(CalliopeContext.Provider, { value: pluginConfig, children: _jsx("div", { className: config.readOnly ? "editor-container-readonly" : "editor-container", ref: containerRef, children: _jsxs(LexicalComposer, { initialConfig: initialConfig, children: [_jsx(RichTextPlugin, { contentEditable: _jsx(ContentEditable, { className: "editor-content-editable-root" }), placeholder: _jsx("div", { className: "editor-placeholder", children: config.placeholderText }) }), _jsx(EditorPlugins, { readOnly: config.readOnly, setFormats: setFormats, internalFormat: internalFormat, setInternalFormat: setInternalFormat, setEditorRef: setEditorRef, editorRef: editorRef, onEditorChange: onEditorChange, config: config }), internalFormat.isLink && createPortal(_jsx(FloatingLinkEditor, { editor: editorRef }), document.body)] }) }) }) }));
};
export default Editor;
