import type {LexicalEditor, RangeSelection} from 'lexical';
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
} from 'lexical';
import emojiToolkit from 'emoji-toolkit';

const TRIGGERS = [':', '\\u003A'].join('');
const VALID_CHARS = '[^' + TRIGGERS + '\\s]';
const LENGTH_LIMIT = 105;

export interface EmojiStrategy {
  [x: string]: {
    [x: string]: string[];
  };
}

const EmojisRegex = new RegExp(
  '(^|\\s|\\()(' +
    '[' +
    TRIGGERS +
    ']' +
    '((?:' +
    VALID_CHARS +
    '){0,' +
    LENGTH_LIMIT +
    '})' +
    ')$',
);

export function getTextUpToAnchor(selection: RangeSelection): string | null {
  const anchor = selection.anchor;
  if (anchor.type !== 'text') {
    return null;
  }
  const anchorNode = anchor.getNode();
  // We should not be attempting to extract mentions out of nodes
  // that are already being used for other core things. This is
  // especially true for immutable nodes, which can't be mutated at all.
  if (!anchorNode.isSimpleText()) {
    return null;
  }
  const anchorOffset = anchor.offset;
  return anchorNode.getTextContent().slice(0, anchorOffset);
}

export function tryToPositionRange(match: MentionMatch, range: Range): boolean {
  const domSelection = window.getSelection();
  if (domSelection === null || !domSelection.isCollapsed) {
    return false;
  }
  const anchorNode = domSelection.anchorNode;
  const startOffset = match.leadOffset;
  const endOffset = domSelection.anchorOffset;
  try {
    range.setStart(anchorNode, startOffset);
    range.setEnd(anchorNode, endOffset);
  } catch (error) {
    return false;
  }

  return true;
}

export function isSelectionOnEntityBoundary(
  editor: LexicalEditor,
  offset: number,
): boolean {
  if (offset !== 0) {
    return false;
  }
  return editor.getEditorState().read(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchor = selection.anchor;
      const anchorNode = anchor.getNode();
      const prevSibling = anchorNode.getPreviousSibling();
      return $isTextNode(prevSibling) && prevSibling.isTextEntity();
    }
    return false;
  });
}

export const getEmojisTextToSearch = (editor: LexicalEditor): string | null => {
  let text = null;
  editor.getEditorState().read(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) {
      return;
    }
    text = getTextUpToAnchor(selection);
  });
  return text;
}

interface EmojiListObject {
  [s: string]: string[];
}

interface EmojiList {
  setPriorityList(newPriorityList: EmojiListObject): void;
  list: EmojiListObject;
}

function newEmojiListWithOutPriorityList(
  priorityList: EmojiListObject
): EmojiListObject {
  const list: EmojiListObject = {};
  for (const key in emojiToolkit.emojiList) {
    // eslint-disable-line no-restricted-syntax
    if (priorityList.hasOwnProperty(key)) {
      // eslint-disable-line no-prototype-builtins
      continue; // eslint-disable-line no-continue
    }

    list[key] = [emojiToolkit.emojiList[key].uc_base];
  }

  return { ...priorityList, ...list };
}

const emojiList: EmojiList = {
  setPriorityList(newPriorityList) {
    this.list = newEmojiListWithOutPriorityList(newPriorityList);
  },
  list: {},
};

// init emojiList
const priorityList: EmojiListObject = {
  ':thumbsup:': ['1f44d'],
  ':smile:': ['1f604'],
  ':heart:': ['2764-fe0f', '2764'],
  ':ok_hand:': ['1f44c'],
  ':joy:': ['1f602'],
  ':tada:': ['1f389'],
  ':see_no_evil:': ['1f648'],
  ':raised_hands:': ['1f64c'],
  ':100:': ['1f4af'],
};
emojiList.setPriorityList(priorityList);


export function getPossibleEmojiMatch(text): string | null {
  let match = EmojisRegex.exec(text);

  if (match !== null) {
    // The strategy ignores leading whitespace but we need to know it's
    // length to add it to the leadOffset
    const maybeLeadingWhitespace = match[1];

    const matchingString = match[3];
    if (matchingString.length >= 1) {
      return {
        leadOffset: match.index + maybeLeadingWhitespace.length,
        matchingString,
        replaceableString: match[2],
      };
    }
  }

  return null;
}


export default emojiList;
