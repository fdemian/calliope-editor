import { jsx as _jsx } from "react/jsx-runtime";
import { DecoratorNode } from 'lexical';
import './Keyboard.css';
export class KeyboardNode extends DecoratorNode {
    __text;
    static getType() {
        return 'kbdnode';
    }
    static clone(node) {
        return new KeyboardNode(node.__text, node.__key);
    }
    static importJSON(serializedNode) {
        const node = $createKeyboardNode(serializedNode.text);
        return node;
    }
    exportJSON() {
        return {
            text: this.__text,
            type: 'kbdnode',
            version: 1
        };
    }
    constructor(text, key) {
        super(key);
        this.__text = text;
    }
    createDOM() {
        return document.createElement('span');
    }
    updateDOM(prevNode) {
        // If the inline property changes, replace the element
        return this.__text !== prevNode.__text;
    }
    setText(text) {
        const writable = this.getWritable();
        writable.__text = text;
    }
    decorate() {
        return (_jsx("kbd", { children: this.__text }));
    }
}
export function $createKeyboardNode(text) {
    const kbdNode = new KeyboardNode(text);
    return kbdNode;
}
export function $isKeyboardNode(node) {
    return node instanceof KeyboardNode;
}
