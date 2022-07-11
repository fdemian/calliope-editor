import { jsx as _jsx } from "react/jsx-runtime";
import { DecoratorNode } from 'lexical';
import Spoiler from './Spoiler';
export class SpoilerNode extends DecoratorNode {
    __text;
    static getType() {
        return 'spoiler-inline';
    }
    static clone(node) {
        return new SpoilerNode(node.__text, node.__key);
    }
    constructor(text, key) {
        super(key);
        this.__text = text;
    }
    createDOM(config) {
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
    static importJSON(serializedNode) {
        const node = $createSpoilerNode(serializedNode.text);
        return node;
    }
    exportJSON() {
        return {
            text: this.__text,
            type: 'spoiler-inline',
            version: 1
        };
    }
    decorate() {
        return (_jsx(Spoiler, { text: this.__text }));
    }
}
export function $createSpoilerNode(text = '') {
    const spoilerNode = new SpoilerNode(text);
    return spoilerNode;
}
export function $isSpoilerNode(node) {
    return node instanceof SpoilerNode;
}
