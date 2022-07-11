import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import { DecoratorBlockNode, } from '@lexical/react/LexicalDecoratorBlockNode';
import { useCallback, useEffect, useRef, useState } from 'react';
const WIDGET_SCRIPT_URL = 'https://platform.twitter.com/widgets.js';
const getHasScriptCached = () => document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`);
function convertTweetElement(domNode) {
    const id = domNode.getAttribute('data-lexical-tweet-id');
    const node = $createTweetNode(id);
    return { node };
}
function TweetComponent({ className, format, loadingComponent, nodeKey, onError, onLoad, tweetID, }) {
    const containerRef = useRef(null);
    const previousTweetIDRef = useRef('');
    const [isLoading, setIsLoading] = useState(false);
    const createTweet = useCallback(async () => {
        try {
            // @ts-expect-error Twitter is attached to the window.
            await window.twttr.widgets.createTweet(tweetID, containerRef.current);
            setIsLoading(false);
            if (onLoad) {
                onLoad();
            }
        }
        catch (error) {
            if (onError) {
                onError(String(error));
            }
        }
    }, [onError, onLoad, tweetID]);
    useEffect(() => {
        if (tweetID !== previousTweetIDRef.current) {
            setIsLoading(true);
            if (!getHasScriptCached()) {
                const script = document.createElement('script');
                script.src = WIDGET_SCRIPT_URL;
                script.async = true;
                document.body?.appendChild(script);
                script.onload = createTweet;
                script.onerror = onError;
            }
            else {
                createTweet();
            }
            if (previousTweetIDRef) {
                previousTweetIDRef.current = tweetID;
            }
        }
    }, [createTweet, onError, tweetID]);
    return (_jsxs(BlockWithAlignableContents, { className: className, format: format, nodeKey: nodeKey, children: [isLoading ? loadingComponent : null, _jsx("div", { className: "tweet-node-internal", style: { display: 'inline-block', maxWidth: '550px' }, ref: containerRef })] }));
}
export class TweetNode extends DecoratorBlockNode {
    __id;
    static getType() {
        return 'tweet';
    }
    static clone(node) {
        return new TweetNode(node.__id, node.__format, node.__key);
    }
    static importJSON(serializedNode) {
        const node = $createTweetNode(serializedNode.id);
        node.setFormat(serializedNode.format);
        return node;
    }
    exportJSON() {
        return {
            ...super.exportJSON(),
            id: this.getId(),
            type: 'tweet',
            version: 1,
        };
    }
    static importDOM() {
        return {
            div: (domNode) => {
                if (!domNode.hasAttribute('data-lexical-tweet-id')) {
                    return null;
                }
                return {
                    conversion: convertTweetElement,
                    priority: 2,
                };
            },
        };
    }
    exportDOM() {
        const element = document.createElement('div');
        element.setAttribute('data-lexical-tweet-id', this.__id);
        return { element };
    }
    constructor(id, format, key) {
        super(format, key);
        this.__id = id;
    }
    getId() {
        return this.__id;
    }
    decorate(editor, config) {
        const embedBlockTheme = config.theme.embedBlock || {};
        const className = {
            base: embedBlockTheme.base || '',
            focus: embedBlockTheme.focus || '',
        };
        return (_jsx(TweetComponent, { className: className, format: this.__format, loadingComponent: "Loading...", nodeKey: this.getKey(), tweetID: this.__id }));
    }
    isTopLevel() {
        return true;
    }
}
export function $createTweetNode(tweetID) {
    return new TweetNode(tweetID);
}
export function $isTweetNode(node) {
    return node instanceof TweetNode;
}
