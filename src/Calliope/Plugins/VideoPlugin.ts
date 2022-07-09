/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type {LexicalCommand} from 'lexical';

import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from 'lexical';
import {useEffect} from 'react';

import {$createVideoNode, VideoNode} from '../Nodes/VideoNode';

export const INSERT_VIDEO_COMMAND: LexicalCommand<string> = createCommand();

export default function VideoPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([VideoNode])) {
      throw new Error('VideoPlugin: VideoNode not registered on editor');
    }

    return editor.registerCommand(
      INSERT_VIDEO_COMMAND,
      (payload) => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const focusNode = selection.focus.getNode();
          if (focusNode !== null) {
            const videoNode = $createVideoNode(payload);
            selection.focus
              .getNode()
              .getTopLevelElementOrThrow()
              .insertAfter(videoNode);
            const paragraphNode = $createParagraphNode();
            videoNode.insertAfter(paragraphNode);
            paragraphNode.select();
          }
        }
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
