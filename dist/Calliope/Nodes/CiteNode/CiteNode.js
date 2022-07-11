import { jsx as _jsx } from "react/jsx-runtime";
import { DecoratorNode } from 'lexical';
import CiteQuote from './CiteQuote';
export class CiteNode extends DecoratorNode {
    __id;
    __author;
    __source;
    static getType() {
        return 'cite-node';
    }
    static clone(node) {
        return new CiteNode(node.__author, node.__source, node.__key);
    }
    constructor(author, source, key) {
        super(key);
        this.__author = author;
        this.__source = source;
    }
    static importJSON(serializedNode) {
        const author = {
            name: serializedNode.authorName,
            link: serializedNode.authorLink
        };
        const source = {
            content: serializedNode.sourceContent,
            link: serializedNode.sourceLink
        };
        const node = $createCiteNode(author, source);
        return node;
    }
    exportJSON() {
        return {
            authorName: this.__author.name,
            authorLink: this.__author.link,
            sourceContent: this.__source.content,
            sourceLink: this.__source.link,
            type: 'cite-node',
            version: 1,
        };
    }
    createDOM() {
        return document.createElement('div');
    }
    updateDOM() {
        return false;
    }
    decorate() {
        return (_jsx(CiteQuote, { author: this.__author, source: this.__source }));
    }
}
export function $createCiteNode(author, source) {
    return new CiteNode(author, source);
}
export function $isCiteNode(node) {
    return node instanceof CiteNode;
}
