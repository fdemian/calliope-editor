/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */
 /* eslint-disable no-use-before-define */
import type {ElementFormatType, LexicalNode, NodeKey} from 'lexical';
import {BlockWithAlignableContents} from '@lexical/react/LexicalBlockWithAlignableContents';
import {DecoratorBlockNode} from '@lexical/react/LexicalDecoratorBlockNode';
import ReactPlayer from 'react-player';
import * as React from 'react';

type VideoProps = $ReadOnly<{
  format: ElementFormatType,
  nodeKey: NodeKey,
  videoURL: string,
}>;

function VideoComponent({format, nodeKey, videoURL, className}: VideoProps) {
  return (
    <BlockWithAlignableContents
      format={format}
      nodeKey={nodeKey}
      className={className}
    >
      <ReactPlayer
        url={videoURL}
        controls={true}
      />
    </BlockWithAlignableContents>
  );
}

export class VideoNode extends DecoratorBlockNode<React$Node> {
  __url: string;

  static getType(): string {
    return 'video';
  }

  static clone(node: VideoNode): VideoNode {
    return new VideoNode(node.__url, node.__key);
  }

  constructor(url: string, key?: NodeKey) {
    super(key);
    this.__url = url;
  }

  updateDOM(): false {
    return false;
  }

  static importJSON(serializedNode){
    const node = $createVideoNode(serializedNode.videoURL);
    return node;
  }

  exportJSON() {
    return {
      videoURL: this.__url,
      type: 'video',
      version: 1
    };
  }

  decorate(editor: LexicalEditor, config: EditorConfig): React$Node {
    const embedBlockTheme = config.theme.embedBlock || {};
    const className = {
      base: embedBlockTheme.base || '',
      focus: embedBlockTheme.focus || '',
    };
    return (
      <VideoComponent
        className={className}
        format={this.__format}
        nodeKey={this.getKey()}
        videoURL={this.__url}
      />
    );
  }
}

export function $createVideoNode(videoURL: string): VideoNode {
  return new VideoNode(videoURL);
}

export function $isVideoNode(node: LexicalNode): boolean {
  return node instanceof VideoNode;
}
