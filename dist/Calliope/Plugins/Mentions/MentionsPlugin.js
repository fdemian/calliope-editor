import { jsx as _jsx } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { startTransition, useCallback, useEffect, useState, } from 'react';
// $FlowFixMe
import { createPortal } from 'react-dom';
import { MentionNode } from '../../Nodes/MentionNode/MentionNode.tsx';
import MentionsTypeahead from './MentionsTypeahead.tsx';
import { getPossibleMentionMatch, isSelectionOnEntityBoundary, getMentionsTextToSearch, tryToPositionRange } from './utils.ts';
function useMentions(editor, config) {
    const [resolution, setResolution] = useState(null);
    useEffect(() => {
        if (!editor.hasNodes([MentionNode])) {
            throw new Error('MentionsPlugin: MentionNode not registered on editor');
        }
    }, [editor]);
    useEffect(() => {
        if (resolution) {
            const { match } = resolution;
            config.onSearchChange(match);
        }
    }, [resolution, config]);
    useEffect(() => {
        let activeRange = document.createRange();
        let previousText = null;
        const updateListener = () => {
            const range = activeRange;
            const text = getMentionsTextToSearch(editor);
            if (text === previousText || range === null) {
                return;
            }
            previousText = text;
            if (text === null) {
                return;
            }
            const match = getPossibleMentionMatch(text);
            if (match !== null &&
                !isSelectionOnEntityBoundary(editor, match.leadOffset)) {
                const isRangePositioned = tryToPositionRange(match, range);
                if (isRangePositioned !== null) {
                    startTransition(() => setResolution({
                        match,
                        range,
                    }));
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
    const closeTypeahead = useCallback(() => {
        setResolution(null);
    }, []);
    return resolution === null || editor === null
        ? null
        : createPortal(_jsx(MentionsTypeahead, { close: closeTypeahead, resolution: resolution, editor: editor, config: config }), document.body);
}
export default function MentionsPlugin({ config }) {
    const [editor] = useLexicalComposerContext();
    return useMentions(editor, config);
}
