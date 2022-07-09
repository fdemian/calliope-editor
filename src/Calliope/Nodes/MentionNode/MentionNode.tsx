/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */
 /* eslint-disable no-use-before-define */
 import type {
  SerializedLexicalNode,
  Spread,
} from 'lexical';
import {DecoratorNode} from 'lexical';
import './MentionNode.css';

export type SerializedMentionNode = Spread<
  {
    mention: string;
    link: string;
    type: 'mention';
    version: 1;
  },
  SerializedLexicalNode
>;

 export class MentionNode extends DecoratorNode<React$Node> {
  __mentionName: string;
  __link: string;

  static getType(): string {
    return 'mention';
  }

  static importJSON(serializedNode: SerializedMentionNode): EmojiNode {

    const node = $createMentionNode(serializedNode.name, serializedNode.link);
    //node.setFormat(serializedNode.format);
    //node.setDetail(serializedNode.detail);
    //node.setMode(serializedNode.mode);
    //node.setStyle(serializedNode.style);
    return node;
  }

  exportJSON(): SerializedEmojiNode {
    return {
      name: this.__mentionName,
      link: this.__link,
      type: 'mention',
      version: 1
    };
  }

  static clone(node: MentionNode): MentionNode {
    return new MentionNode(node.__mentionName, node.__link, node.__key);
  }

  constructor(mentionName: string, link: string, key?: NodeKey) {
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

  createDOM(): HTMLElement {
    return document.createElement('span');
  }

  updateDOM(): false {
    return false;
  }

  decorate(): React$Node {
    return (
    <a href={this.__link} className="user-mention">
      @{this.__mentionName}
    </a>
    );
  }
}

export function $createMentionNode(mentionName: string, link:string): MentionNode {
  const mentionNode = new MentionNode(mentionName, link);
  return mentionNode;
}

export function $isMentionNode(node: LexicalNode): boolean {
  return node instanceof MentionNode;
}
