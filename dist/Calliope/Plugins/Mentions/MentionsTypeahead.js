import { jsx as _jsx } from "react/jsx-runtime";
import { mergeRegister } from '@lexical/utils';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_LOW, KEY_ARROW_DOWN_COMMAND, KEY_ARROW_UP_COMMAND, KEY_ENTER_COMMAND, KEY_ESCAPE_COMMAND, KEY_TAB_COMMAND, } from 'lexical';
import { useCallback, useEffect, useRef, useState, } from 'react';
// $FlowFixMe
import useLayoutEffect from '../../shared/useLayoutEffect';
import { $createMentionNode } from '../../Nodes/MentionNode/MentionNode';
import MentionsTypeaheadItem from './MentionsTypeaheadItem.tsx';
// At most, 5 suggestions are shown in the popup.
const SUGGESTION_LIST_LENGTH_LIMIT = 5;
/**
 * Walk backwards along user input and forward through entity title to try
 * and replace more of the user's text with entity.
 *
 * E.g. User types "Hello Sarah Smit" and we match "Smit" to "Sarah Smith".
 * Replacing just the match would give us "Hello Sarah Sarah Smith".
 * Instead we find the string "Sarah Smit" and replace all of it.
 */
function getMentionOffset(documentText, entryText, offset) {
    let triggerOffset = offset;
    for (let ii = triggerOffset; ii <= entryText.length; ii++) {
        if (documentText.substr(-ii) === entryText.substr(0, ii)) {
            triggerOffset = ii;
        }
    }
    return triggerOffset;
}
/**
 * From a Typeahead Search Result, replace plain text from search offset and
 * render a newly created MentionNode.
 */
function createMentionNodeFromSearchResult(editor, selectedEntry, match) {
    editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
            return;
        }
        const anchor = selection.anchor;
        if (anchor.type !== 'text') {
            return;
        }
        const anchorNode = anchor.getNode();
        // We should not be attempting to extract mentions out of nodes
        // that are already being used for other core things. This is
        // especially true for immutable nodes, which can't be mutated at all.
        if (!anchorNode.isSimpleText()) {
            return;
        }
        const selectionOffset = anchor.offset;
        const textContent = anchorNode.getTextContent().slice(0, selectionOffset);
        const characterOffset = match.replaceableString.length;
        // Given a known offset for the mention match, look backward in the
        // text to see if there's a longer match to replace.
        const mentionOffset = getMentionOffset(textContent, selectedEntry.name, characterOffset);
        const startOffset = selectionOffset - mentionOffset;
        if (startOffset < 0) {
            return;
        }
        let nodeToReplace;
        if (startOffset === 0) {
            [nodeToReplace] = anchorNode.splitText(selectionOffset);
        }
        else {
            [, nodeToReplace] = anchorNode.splitText(startOffset, selectionOffset);
        }
        const mentionNode = $createMentionNode(selectedEntry.name, selectedEntry.link);
        selection.insertNodes([mentionNode]);
        nodeToReplace.replace(mentionNode);
        //mentionNode.select();
    });
}
const MentionsTypeahead = ({ close, editor, resolution, config }) => {
    const divRef = useRef(null);
    const match = resolution.match;
    const results = config.mentionsData;
    const [selectedIndex, setSelectedIndex] = useState(null);
    useEffect(() => {
        const div = divRef.current;
        const rootElement = editor.getRootElement();
        if (results !== null && div !== null && rootElement !== null) {
            const range = resolution.range;
            const { left, top, height } = range.getBoundingClientRect();
            div.style.top = `${top + height + 2}px`;
            div.style.left = `${left - 14}px`;
            div.style.display = 'block';
            rootElement.setAttribute('aria-controls', 'mentions-typeahead');
            return () => {
                div.style.display = 'none';
                rootElement.removeAttribute('aria-controls');
            };
        }
    }, [editor, resolution, results]);
    const applyCurrentSelected = useCallback(() => {
        if (results === null || selectedIndex === null) {
            return;
        }
        const selectedEntry = results[selectedIndex];
        close();
        createMentionNodeFromSearchResult(editor, selectedEntry, match);
        if (config.onAddMention) {
            config.onAddMention(selectedEntry);
        }
    }, [close, match, editor, results, selectedIndex, config]);
    const updateSelectedIndex = useCallback((index) => {
        const rootElem = editor.getRootElement();
        if (rootElem !== null) {
            rootElem.setAttribute('aria-activedescendant', 'typeahead-item-' + index);
            setSelectedIndex(index);
        }
    }, [editor]);
    useEffect(() => {
        return () => {
            const rootElem = editor.getRootElement();
            if (rootElem !== null) {
                rootElem.removeAttribute('aria-activedescendant');
            }
        };
    }, [editor]);
    useLayoutEffect(() => {
        if (results === null) {
            setSelectedIndex(null);
        }
        else if (selectedIndex === null) {
            updateSelectedIndex(0);
        }
    }, [results, selectedIndex, updateSelectedIndex]);
    useEffect(() => {
        return mergeRegister(editor.registerCommand(KEY_ARROW_DOWN_COMMAND, (payload) => {
            const event = payload;
            if (results !== null && selectedIndex !== null) {
                if (selectedIndex < SUGGESTION_LIST_LENGTH_LIMIT - 1 &&
                    selectedIndex !== results.length - 1) {
                    updateSelectedIndex(selectedIndex + 1);
                }
                event.preventDefault();
                event.stopImmediatePropagation();
            }
            return true;
        }, COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_ARROW_UP_COMMAND, (payload) => {
            const event = payload;
            if (results !== null && selectedIndex !== null) {
                if (selectedIndex !== 0) {
                    updateSelectedIndex(selectedIndex - 1);
                }
                event.preventDefault();
                event.stopImmediatePropagation();
            }
            return true;
        }, COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_ESCAPE_COMMAND, (payload) => {
            const event = payload;
            if (results === null || selectedIndex === null) {
                return false;
            }
            event.preventDefault();
            event.stopImmediatePropagation();
            close();
            return true;
        }, COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_TAB_COMMAND, (payload) => {
            const event = payload;
            if (results === null || selectedIndex === null) {
                return false;
            }
            event.preventDefault();
            event.stopImmediatePropagation();
            applyCurrentSelected();
            return true;
        }, COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_ENTER_COMMAND, (event) => {
            if (results === null || selectedIndex === null) {
                return false;
            }
            if (event !== null) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
            applyCurrentSelected();
            return true;
        }, COMMAND_PRIORITY_LOW));
    }, [
        applyCurrentSelected,
        close,
        editor,
        results,
        selectedIndex,
        updateSelectedIndex,
    ]);
    if (results === null) {
        return null;
    }
    return (_jsx("div", { "aria-label": "Suggested mentions", id: "mentions-typeahead", ref: divRef, role: "listbox", children: _jsx("ul", { children: results.slice(0, SUGGESTION_LIST_LENGTH_LIMIT).map((result, i) => (_jsx(MentionsTypeaheadItem, { index: i, isSelected: i === selectedIndex, entryComponent: config.entryComponent, onClick: () => {
                    setSelectedIndex(i);
                    applyCurrentSelected();
                }, onMouseEnter: () => {
                    setSelectedIndex(i);
                }, onMouseLeave: () => {
                    setSelectedIndex(null);
                }, result: result }))) }, "mentions-typeahead-list") }));
};
export default MentionsTypeahead;
