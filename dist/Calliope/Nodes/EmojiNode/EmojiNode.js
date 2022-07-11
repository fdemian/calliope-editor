import { jsx as _jsx } from "react/jsx-runtime";
import { DecoratorNode } from 'lexical';
import EmojiImage from './EmojiImage';
export class EmojiNode extends DecoratorNode {
    __emoji;
    static getType() {
        return 'emoji';
    }
    static importJSON(serializedNode) {
        const node = $createEmojiNode(serializedNode.emoji);
        return node;
    }
    exportJSON() {
        return {
            emoji: this.__emoji,
            type: 'emoji',
            version: 1
        };
    }
    static clone(node) {
        return new EmojiNode(node.__emoji, node.__key);
    }
    constructor(emoji, key) {
        super(key);
        this.__emoji = emoji;
    }
    createDOM(config) {
        return document.createElement('span');
    }
    updateDOM(prevNode) {
        return this.__emoji !== prevNode.__emoji;
    }
    decorate() {
        return _jsx(EmojiImage, { emoji: this.__emoji });
    }
}
export function $createEmojiNode(emoji) {
    const emojiNode = new EmojiNode(emoji);
    return emojiNode;
}
export function $isEmojiNode(node) {
    return node instanceof EmojiNode;
}
