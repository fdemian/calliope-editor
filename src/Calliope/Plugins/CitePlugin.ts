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

import {$createCiteNode, CiteNode} from '../Nodes/CiteNode/CiteNode.tsx';

export const INSERT_CITE_QUOTE: LexicalCommand<string> = createCommand();

export default function CitePlugin(): React$Node {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([CiteNode])) {
      throw new Error('CitePlugin: CiteNode not registered on editor');
    }

    return editor.registerCommand(
      INSERT_CITE_QUOTE,
      (payload) => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const focusNode = selection.focus.getNode();
          if (focusNode !== null) {
            const citeNode = $createCiteNode(payload.author, payload.source);
            selection.focus
              .getNode()
              .getTopLevelElementOrThrow()
              .insertAfter(citeNode);
            const paragraphNode = $createParagraphNode();
            citeNode.insertAfter(paragraphNode);
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
