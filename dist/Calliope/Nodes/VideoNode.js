import { jsx as _jsx } from "react/jsx-runtime";
import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import { DecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
import ReactPlayer from 'react-player';
function VideoComponent({ format, nodeKey, videoURL, className }) {
    return (_jsx(BlockWithAlignableContents, { format: format, nodeKey: nodeKey, className: className, children: _jsx(ReactPlayer, { url: videoURL, controls: true }) }));
}
export class VideoNode extends DecoratorBlockNode {
    __url;
    static getType() {
        return 'video';
    }
    static clone(node) {
        return new VideoNode(node.__url, node.__key);
    }
    constructor(url, key) {
        super(key);
        this.__url = url;
    }
    updateDOM() {
        return false;
    }
    static importJSON(serializedNode) {
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
    decorate(editor, config) {
        const embedBlockTheme = config.theme.embedBlock || {};
        const className = {
            base: embedBlockTheme.base || '',
            focus: embedBlockTheme.focus || '',
        };
        return (_jsx(VideoComponent, { className: className, format: this.__format, nodeKey: this.getKey(), videoURL: this.__url }));
    }
}
export function $createVideoNode(videoURL) {
    return new VideoNode(videoURL);
}
export function $isVideoNode(node) {
    return node instanceof VideoNode;
}
