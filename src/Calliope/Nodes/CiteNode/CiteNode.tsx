import React, { useContext } from 'react';
import type {
 LexicalNode,
 NodeKey,
 Spread
} from 'lexical';
import { DecoratorNode } from 'lexical';
import CiteQuote from './CiteQuote';

export type SerializedCiteNode = Spread<
  {
    authorName: string;
    authorLink: string;
    sourceContent: string;
    sourceLink: string;
    type: 'cite-node';
    version: 1;
  },
  SerializedDecoratorBlockNode
>;

type Author = {
  name: string;
  link: string;
};

type Source = {
  content: string;
  link: string;
}

export class CiteNode extends DecoratorNode<React$Node> {
  __id: string;
  __author: Author;
  __source: Source;

  static getType(): string {
    return 'cite-node';
  }

  static clone(node: CiteNode): CiteNode {
    return new CiteNode(node.__author, node.__source, node.__key);
  }

  constructor(author:Author, source:Source, key?: NodeKey) {
    super(key);
    this.__author = author;
    this.__source = source;
  }

  static importJSON(serializedNode: SerializedCiteNode): CiteNode {
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

  exportJSON(): SerializedCiteNode {
    return {
      authorName: this.__author.name,
      authorLink: this.__author.link,
      sourceContent: this.__source.content,
      sourceLink: this.__source.link,
      type: 'cite-node',
      version: 1,
    };
  }

  createDOM(): HTMLElement {
    return document.createElement('div');
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return (
    <CiteQuote
       author={this.__author}
       source={this.__source}
    />
    );
  }
}

export function $createCiteNode(author, source): CiteNode {
  return new CiteNode(author, source);
}

export function $isCiteNode(node: LexicalNode): boolean {
  return node instanceof CiteNode;
}
