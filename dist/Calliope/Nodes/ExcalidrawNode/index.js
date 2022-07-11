import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { mergeRegister } from '@lexical/utils';
import { $getNodeByKey, $getSelection, $isNodeSelection, CLICK_COMMAND, COMMAND_PRIORITY_LOW, DecoratorNode, KEY_BACKSPACE_COMMAND, KEY_DELETE_COMMAND, } from 'lexical';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ImageResizer from '../ImageNode/ImageResizer.tsx';
import ExcalidrawImage from './ExcalidrawImage.tsx';
import ExcalidrawModal from './ExcalidrawModal.tsx';
function ExcalidrawComponent({ nodeKey, data, }) {
    const [editor] = useLexicalComposerContext();
    const [isModalOpen, setModalOpen] = useState(data === '[]' && !editor.isReadOnly());
    const imageContainerRef = useRef(null);
    const buttonRef = useRef(null);
    const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
    const [isResizing, setIsResizing] = useState(false);
    const onDelete = useCallback((event) => {
        if (isSelected && $isNodeSelection($getSelection())) {
            event.preventDefault();
            editor.update(() => {
                const node = $getNodeByKey(nodeKey);
                if ($isExcalidrawNode(node)) {
                    node.remove();
                }
                setSelected(false);
            });
        }
        return false;
    }, [editor, isSelected, nodeKey, setSelected]);
    // Set editor to readOnly if excalidraw is open to prevent unwanted changes
    useEffect(() => {
        if (isModalOpen) {
            editor.setReadOnly(true);
        }
        else {
            editor.setReadOnly(editor.isReadOnly());
        }
    }, [isModalOpen, editor]);
    useEffect(() => {
        return mergeRegister(editor.registerCommand(CLICK_COMMAND, (event) => {
            const buttonElem = buttonRef.current;
            const eventTarget = event.target;
            if (isResizing) {
                return true;
            }
            if (buttonElem !== null && buttonElem.contains(eventTarget)) {
                if (!event.shiftKey) {
                    clearSelection();
                }
                setSelected(!isSelected);
                if (event.detail > 1) {
                    setModalOpen(true);
                }
                return true;
            }
            return false;
        }, COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_DELETE_COMMAND, onDelete, COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_BACKSPACE_COMMAND, onDelete, COMMAND_PRIORITY_LOW));
    }, [clearSelection, editor, isSelected, isResizing, onDelete, setSelected]);
    const deleteNode = useCallback(() => {
        setModalOpen(false);
        return editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if ($isExcalidrawNode(node)) {
                node.remove();
            }
        });
    }, [editor, nodeKey]);
    const setData = (newData) => {
        if (editor.isReadOnly()) {
            return;
        }
        return editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if ($isExcalidrawNode(node)) {
                if (newData.length > 0) {
                    node.setData(JSON.stringify(newData));
                }
                else {
                    node.remove();
                }
            }
        });
    };
    const onResizeStart = () => {
        setIsResizing(true);
    };
    const onResizeEnd = () => {
        // Delay hiding the resize bars for click case
        setTimeout(() => {
            setIsResizing(false);
        }, 200);
    };
    const elements = useMemo(() => JSON.parse(data), [data]);
    return (_jsxs(_Fragment, { children: [_jsx(ExcalidrawModal, { initialElements: elements, isShown: isModalOpen, onDelete: deleteNode, onHide: () => {
                    editor.setReadOnly(false);
                    setModalOpen(false);
                }, onSave: (newData) => {
                    editor.setReadOnly(false);
                    setData(newData);
                    setModalOpen(false);
                }, closeOnClickOutside: true }), elements.length > 0 && (_jsxs("button", { ref: buttonRef, className: `excalidraw-button ${isSelected ? 'selected' : ''}`, children: [_jsx(ExcalidrawImage, { imageContainerRef: imageContainerRef, className: "image", elements: elements }), (isSelected || isResizing) && (_jsx(ImageResizer, { showCaption: true, setShowCaption: () => null, imageRef: imageContainerRef, editor: editor, onResizeStart: onResizeStart, onResizeEnd: onResizeEnd }))] }))] }));
}
function convertExcalidrawElement(domNode) {
    const excalidrawData = domNode.getAttribute('data-lexical-excalidraw-json');
    if (excalidrawData) {
        const node = $createExcalidrawNode();
        node.__data = excalidrawData;
        return {
            node,
        };
    }
    return null;
}
export class ExcalidrawNode extends DecoratorNode {
    __data;
    static getType() {
        return 'excalidraw';
    }
    static clone(node) {
        return new ExcalidrawNode(node.__data, node.__key);
    }
    static importJSON(serializedNode) {
        return new ExcalidrawNode(serializedNode.data);
    }
    exportJSON() {
        return {
            data: this.__data,
            type: 'excalidraw',
            version: 1,
        };
    }
    constructor(data = '[]', key) {
        super(key);
        this.__data = data;
    }
    // View
    createDOM(config) {
        const span = document.createElement('span');
        const theme = config.theme;
        const className = theme.image;
        if (className !== undefined) {
            span.className = className;
        }
        return span;
    }
    updateDOM() {
        return false;
    }
    static importDOM() {
        return {
            span: (domNode) => {
                if (!domNode.hasAttribute('data-lexical-excalidraw-json')) {
                    return null;
                }
                return {
                    conversion: convertExcalidrawElement,
                    priority: 1,
                };
            },
        };
    }
    exportDOM(editor) {
        const element = document.createElement('span');
        const content = editor.getElementByKey(this.getKey());
        if (content !== null) {
            const svg = content.querySelector('svg');
            if (svg !== null) {
                element.innerHTML = svg.outerHTML;
            }
        }
        element.setAttribute('data-lexical-excalidraw-json', this.__data);
        return { element };
    }
    setData(data) {
        const self = this.getWritable();
        self.__data = data;
    }
    decorate(editor, config) {
        return _jsx(ExcalidrawComponent, { nodeKey: this.getKey(), data: this.__data });
    }
}
export function $createExcalidrawNode() {
    return new ExcalidrawNode();
}
export function $isExcalidrawNode(node) {
    return node instanceof ExcalidrawNode;
}
