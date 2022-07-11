import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
//import {MarkNode} from '@lexical/mark';
import { OverflowNode } from '@lexical/overflow';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { EmojiNode } from './EmojiNode/EmojiNode.tsx';
import { MentionNode } from './MentionNode/MentionNode.tsx';
import { KeyboardNode } from './Keyboard/Keyboard.tsx';
import { SpoilerNode } from './Spoiler/SpoilerNode.tsx';
import { ImageNode } from './ImageNode/ImageNode.tsx';
import { TweetNode } from './TweetNode.tsx';
import { EquationNode } from './Equation/EquationNode.tsx';
import { VideoNode } from './VideoNode.tsx';
import { ExcalidrawNode } from './ExcalidrawNode/index.tsx';
import { CiteNode } from './CiteNode/CiteNode.tsx';
const Nodes = [
    ListNode,
    ListItemNode,
    AutoLinkNode,
    LinkNode,
    MentionNode,
    EmojiNode,
    KeyboardNode,
    OverflowNode,
    SpoilerNode,
    HeadingNode,
    QuoteNode,
    CodeHighlightNode,
    CodeNode,
    HorizontalRuleNode,
    ImageNode,
    TweetNode,
    TableCellNode,
    TableNode,
    TableRowNode,
    EquationNode,
    VideoNode,
    ExcalidrawNode,
    CiteNode
];
export default Nodes;
