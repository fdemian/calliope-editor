import { jsxs as _jsxs } from "react/jsx-runtime";
import { DecoratorNode } from 'lexical';
import './MentionNode.css';
export class MentionNode extends DecoratorNode {
    __mentionName;
    __link;
    static getType() {
        return 'mention';
    }
    static importJSON(serializedNode) {
        const node = $createMentionNode(serializedNode.name, serializedNode.link);
        //node.setFormat(serializedNode.format);
        //node.setDetail(serializedNode.detail);
        //node.setMode(serializedNode.mode);
        //node.setStyle(serializedNode.style);
        return node;
    }
    exportJSON() {
        return {
            name: this.__mentionName,
            link: this.__link,
            type: 'mention',
            version: 1
        };
    }
    static clone(node) {
        return new MentionNode(node.__mentionName, node.__link, node.__key);
    }
    constructor(mentionName, link, key) {
        super(key);
        this.__mentionName = mentionName;
        this.__link = link;
    }
    /*
    static importJSON(serializedNode: SerializedEmojiNode): EmojiNode {
      const node = $createEmojiNode(serializedNode.emoji);
      //node.setFormat(serializedNode.format);
      //node.setDetail(serializedNode.detail);
      //node.setMode(serializedNode.mode);
      //node.setStyle(serializedNode.style);
      return node;
    }
  
    exportJSON(): SerializedEmojiNode {
      return {
        ...super.exportJSON(),
        emoji: this.__emoji,
        type: 'emoji',
      };
    }
    */
    createDOM() {
        return document.createElement('span');
    }
    updateDOM() {
        return false;
    }
    decorate() {
        return (_jsxs("a", { href: this.__link, className: "user-mention", children: ["@", this.__mentionName] }));
    }
}
export function $createMentionNode(mentionName, link) {
    const mentionNode = new MentionNode(mentionName, link);
    return mentionNode;
}
export function $isMentionNode(node) {
    return node instanceof MentionNode;
}
