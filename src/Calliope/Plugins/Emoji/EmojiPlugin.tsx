/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */
import type {LexicalEditor} from 'lexical';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import React, {
  startTransition,
  useCallback,
  useEffect,
  useState
} from 'react';
// $FlowFixMe
import {createPortal} from 'react-dom';
import {EmojiNode} from '../../Nodes/EmojiNode/EmojiNode.tsx';
import EmojisTypeahead from './EmojisTypeahead.tsx';
import {
  getEmojisTextToSearch,
  tryToPositionRange,
  getPossibleEmojiMatch,
  Resolution
} from './utils';
import emojiList from './utils.ts';

const shortList = Object.keys(emojiList.list);

function useEmojis(editor: LexicalEditor, config): React$Node {

  const [results, setResults] = useState(shortList);
  const [resolution, setResolution] = useState<Resolution | null>(null);
  useEffect(() => {
    if (!editor.hasNodes([EmojiNode])) {
      throw new Error('EmojisPlugin: EmojiNode not registered on editor');
    }
  }, [editor]);

  useEffect(() => {
    if(resolution){
      const { match } = resolution;
      const { matchingString } = match;
      const emojiDataList = results.filter(p => p.includes(matchingString));
      setResults(emojiDataList);
      setResolution(resolution);
    }
  }, [resolution/*, results*/]);

  useEffect(() => {
    let activeRange: Range | null = document.createRange();
    let previousText = null;

    const updateListener = () => {
      const range = activeRange;
      const text = getEmojisTextToSearch(editor);

      if (text === previousText || range === null) {
        return;
      }
      previousText = text;

      if (text === null) {
        return;
      }

      const match = getPossibleEmojiMatch(text);

      if(match !== null) {
        const isRangePositioned = tryToPositionRange(match, range);
        if (isRangePositioned !== null) {
          startTransition(() =>
            setResolution({
              match,
              range,
            }),
          );
          return;
        }
      }
      startTransition(() => setResolution(null));

    };

    const removeUpdateListener = editor.registerUpdateListener(updateListener);

    return () => {
      activeRange = null;
      removeUpdateListener();
    };
  }, [editor]);

  //const closeTypeahead = () => setResolution(null);
  const closeTypeahead = useCallback(() => {
    setResolution(null);
  }, []);

  return resolution === null || editor === null
    ? null
    : createPortal(
        <EmojisTypeahead
          results={results}
          close={closeTypeahead}
          resolution={resolution}
          editor={editor}
          config={config}
        />,
        document.body,
      );
}

export default function EmojisPlugin({ config, setEditorRef }): React$Node {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if(setEditorRef){
      setEditorRef(editor);
    }
  }, [editor, setEditorRef])

  return useEmojis(editor, config);
}
