/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */
import { $getSelection, $isRangeSelection, $isTextNode, } from 'lexical';
import { useEffect, useState } from 'react';
const PUNCTUATION = '\\.,\\+\\*\\?\\$\\@\\|#{}\\(\\)\\^\\-\\[\\]\\\\/!%\'"~=<>_:;';
const NAME = '\\b[A-Z][^\\s' + PUNCTUATION + ']';
const DocumentMentionsRegex = {
    NAME,
    PUNCTUATION,
};
const PUNC = DocumentMentionsRegex.PUNCTUATION;
const TRIGGERS = ['@', '\\uff20'].join('');
// Chars we expect to see in a mention (non-space, non-punctuation).
const VALID_CHARS = '[^' + TRIGGERS + '\\s]';
// Non-standard series of chars. Each series must be preceded and followed by
// a valid char.
const VALID_JOINS = '(?:' +
    '\\.[ |$]|' + // E.g. "r. " in "Mr. Smith"
    ' |' + // E.g. " " in "Josh Duck"
    '[' +
    PUNC +
    ']|' + // E.g. "-' in "Salier-Hellendag"
    ')';
const LENGTH_LIMIT = 75;
const AtSignMentionsRegex = new RegExp('(^|\\s|\\()(' +
    '[' +
    TRIGGERS +
    ']' +
    '((?:' +
    VALID_CHARS +
    VALID_JOINS +
    '){0,' +
    LENGTH_LIMIT +
    '})' +
    ')$');
// 50 is the longest alias length limit.
const ALIAS_LENGTH_LIMIT = 50;
// Regex used to match alias.
const AtSignMentionsRegexAliasRegex = new RegExp('(^|\\s|\\()(' +
    '[' +
    TRIGGERS +
    ']' +
    '((?:' +
    VALID_CHARS +
    '){0,' +
    ALIAS_LENGTH_LIMIT +
    '})' +
    ')$');
const mentionsCache = new Map();
export const dummyLookupService = {
    search(string, mentionsData, callback) {
        setTimeout(() => {
            const results = mentionsData.filter((mention) => mention.toLowerCase().includes(string.toLowerCase()));
            if (results.length === 0) {
                callback(null);
            }
            else {
                callback(results);
            }
        }, 500);
    },
};
export function checkForAtSignMentions(text, minMatchLength) {
    let match = AtSignMentionsRegex.exec(text);
    if (match === null) {
        match = AtSignMentionsRegexAliasRegex.exec(text);
    }
    if (match !== null) {
        // The strategy ignores leading whitespace but we need to know it's
        // length to add it to the leadOffset
        const maybeLeadingWhitespace = match[1];
        const matchingString = match[3];
        if (matchingString.length >= minMatchLength) {
            return {
                leadOffset: match.index + maybeLeadingWhitespace.length,
                matchingString,
                replaceableString: match[2],
            };
        }
    }
    return null;
}
export function getPossibleMentionMatch(text) {
    const match = checkForAtSignMentions(text, 1);
    return match;
}
export function getTextUpToAnchor(selection) {
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
export function tryToPositionRange(match, range) {
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
    }
    catch (error) {
        return false;
    }
    return true;
}
export function getMentionsTextToSearch(editor) {
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
export function isSelectionOnEntityBoundary(editor, offset) {
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
export function useMentionLookupService(mentionString, mentionsData) {
    const [results, setResults] = useState(null);
    useEffect(() => {
        const cachedResults = mentionsCache.get(mentionString);
        if (cachedResults === null) {
            return;
        }
        else if (cachedResults !== undefined) {
            setResults(cachedResults);
            return;
        }
        mentionsCache.set(mentionString, null);
        dummyLookupService.search(mentionString, mentionsData, (newResults) => {
            mentionsCache.set(mentionString, newResults);
            setResults(newResults);
        });
    }, [mentionString, mentionsData]);
    return results;
}
