import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect, useState } from 'react';
import Editor from '../Calliope/CalliopeEditor.tsx';
import { SketchPicker } from 'react-color';
import { initialMentions } from './mentionsData';
import URLToolbar from './URLToolbar';
const QUOTE_STATE = "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":2,\"mode\":\"normal\",\"style\":\"color: rgb(24, 24, 24);background-color: rgb(255, 255, 255);\",\"text\":\"These violent delights have violent ends\",\"type\":\"text\",\"version\":1},{\"type\":\"linebreak\",\"version\":1},{\"detail\":0,\"format\":2,\"mode\":\"normal\",\"style\":\"color: rgb(24, 24, 24);background-color: rgb(255, 255, 255);\",\"text\":\"And in their triump die, like fire and powder\",\"type\":\"text\",\"version\":1},{\"type\":\"linebreak\",\"version\":1},{\"detail\":0,\"format\":2,\"mode\":\"normal\",\"style\":\"color: rgb(24, 24, 24);background-color: rgb(255, 255, 255);\",\"text\":\"Which, as they kiss, consume\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}";
export default {
    title: 'Editor/Empty Composer',
    component: Editor,
    parameters: {},
};
const args = {
    initialState: undefined,
    readOnly: true,
    setFormats: () => { }
};
export const EditorComposer = () => {
    const containerRef = useRef(null);
    const [editorState, setEditorState] = useState(null);
    const [formats, setFormats] = useState({});
    const [suggestions, setSuggestions] = useState(initialMentions);
    const [isSpeechToText, setIsSpeechToText] = useState(false);
    // TOOLBARS
    const [isTweetToolbar, setTweetToolbar] = useState(false);
    const [isVideoToolbar, setVideoToolbar] = useState(false);
    const [isImageToolbar, setImageToolbar] = useState(false);
    const [url, setUrl] = useState(null);
    const toggleTweetToolbar = () => setTweetToolbar(false);
    const toggleVideoToolbar = () => setVideoToolbar(false);
    const toggleImageToolbar = () => setImageToolbar(false);
    const onSearchChange = (match) => {
        if (match && match.matchingString) {
            const stringMatch = match.matchingString;
            const newSuggestions = initialMentions.filter(p => p.name.includes(stringMatch));
            setSuggestions(newSuggestions);
        }
    };
    const blockFormatChangeFn = (val) => {
        if (!containerRef.current)
            return;
        containerRef.current.executeCommand(val);
    };
    const codeLanguageChange = (val) => {
        if (!containerRef.current)
            return;
        containerRef.current.executeCommand("CODE_LANGUAGE_CHANGE", val);
    };
    const fontFamilyChangeFn = (val) => {
        if (!containerRef.current)
            return;
        containerRef.current.executeCommand("CHANGE_FONT", val);
    };
    const fontSizeChange = (val) => {
        if (!containerRef.current)
            return;
        containerRef.current.executeCommand("CHANGE_FONT_SIZE", val);
    };
    const fontColorSelect = (val) => {
        if (!containerRef.current)
            return;
        containerRef.current.executeCommand("CHANGE_FONT_COLOR", val.hex);
    };
    const bgColorSelect = (val) => {
        if (!containerRef.current)
            return;
        containerRef.current.executeCommand("CHANGE_FONT_BG_COLOR", val.hex);
    };
    const insertTweet = () => {
        if (!containerRef.current || url === null)
            return;
        const tweetId = url.split('status/')?.[1]?.split('?')?.[0];
        containerRef.current.executeCommand("INSERT_TWEET", tweetId);
        setUrl(null);
        setTweetToolbar(false);
    };
    const insertImage = () => {
        if (!containerRef.current)
            return;
        const props = {
            altText: "",
            src: url
        };
        containerRef.current.executeCommand("INSERT_IMAGE", props);
        setUrl(null);
        setImageToolbar(false);
    };
    const insertVideo = () => {
        if (!containerRef.current || url === null)
            return;
        containerRef.current.executeCommand("INSERT_VIDEO", url);
        setUrl(null);
        setVideoToolbar(false);
    };
    const insertTable = () => {
        const columns = 7;
        const rows = 7;
        if (!containerRef.current)
            return;
        containerRef.current.executeCommand("INSERT_TABLE", { columns, rows });
    };
    useEffect(() => {
        if (!containerRef.current)
            return;
        containerRef.current.executeCommand("INSERT_CITE_QUOTE", {
            author: { name: '@rulo', link: 'https://www.google.com' },
            source: { content: QUOTE_STATE, link: 'https://www.google.com' }
        });
    }, []);
    const config = {
        placeholderText: 'Insert text...',
        initialState: undefined,
        isReadOnly: false,
        autoFocus: false,
        onError: (error) => {
            throw error;
        },
        plugins: [],
        citation: {
            sourceLinkComponent: ({ sourceLink }) => (_jsx(_Fragment, { children: _jsx("a", { href: sourceLink, children: "[source]" }) })),
        },
        mentions: {
            onSearchChange: onSearchChange,
            onAddMention: (mention) => {
                console.clear();
                console.log(mention);
            },
            entryComponent: ({ avatar, name, link }) => (_jsxs(_Fragment, { children: ["\u00A0 ", _jsx("strong", { children: name })] })),
            mentionsData: suggestions
        }
    };
    // UI props
    const BUTTON_ELEMENTS = [
        {
            text: "BOLD",
            command: "FORMAT",
            props: "bold",
            isActive: formats.isBold
        },
        {
            text: "ITALIC",
            command: "FORMAT",
            props: "italic",
            isActive: formats.isItalic
        },
        {
            text: "UNDERLINE",
            command: "FORMAT",
            props: "underline",
            isActive: formats.isUnderline
        },
        {
            text: "STRIKETHROUGH",
            command: "FORMAT",
            props: "strikethrough",
            isActive: formats.isStrikethrough
        },
        {
            text: "SUPERSCRIPT",
            command: "FORMAT",
            props: "superscript",
            isActive: formats.isSuperscript
        },
        {
            text: "SUBSCRIPT",
            command: "FORMAT",
            props: "subscript",
            isActive: formats.isSubscript
        },
        {
            text: "CODE",
            command: "FORMAT",
            props: "code",
            isActive: formats.isCode
        },
        {
            text: "SPOILER",
            command: "SPOILER",
            props: null,
            isActive: formats.isSpoiler
        },
        {
            text: "KEYBOARD",
            command: "KEYBOARD",
            props: null,
            isActive: formats.isKeyboard
        },
        {
            text: "LINK",
            command: "LINK",
            props: formats.isLink ? null : "https://",
            isActive: formats.isLink
        },
        {
            /* left, center, right justify */
            text: "ALIGN LEFT",
            command: "ALIGN",
            props: "left",
            directCommand: true
        },
        {
            text: "ALIGN RIGHT",
            command: "ALIGN",
            props: "right",
            directCommand: true
        },
        {
            text: "ALIGN CENTER",
            command: "ALIGN",
            props: "center",
            directCommand: true
        },
        {
            text: "JUSTIFY",
            command: "ALIGN",
            props: "justify",
            directCommand: true
        },
        {
            text: "INDENT",
            command: "INDENT",
            props: null,
            directCommand: true
        },
        {
            text: "OUTDENT",
            command: "OUTDENT",
            props: null,
            directCommand: true
        }
    ];
    const blockFormatMap = {
        h1: "H1",
        h2: "H2",
        h3: "H3",
        paragraph: "PARAGRAPH",
        bullet: "BULLET_LIST",
        number: "NUMBERED_LIST",
        check: "CHECK",
        quote: "QUOTE",
        code: "CODE_BLOCK"
    };
    const BLOCK_FORMATS = [
        {
            name: "Normal",
            value: "PARAGRAPH"
        },
        {
            name: "Heading 1",
            value: "H1"
        },
        {
            name: "Heading 2",
            value: "H2"
        },
        {
            name: "Heading 3",
            value: "H3"
        },
        {
            name: "Bullet List",
            value: "BULLET_LIST"
        },
        {
            name: "Numbered List",
            value: "NUMBERED_LIST"
        },
        {
            name: "Check List",
            value: "CHECK"
        },
        {
            name: "Quote",
            value: "QUOTE"
        },
        {
            name: "Code block",
            value: "CODE_BLOCK"
        }
    ];
    const fontFamilyOptions = [
        'Arial',
        'Courier New',
        'Georgia',
        'Times New Roman',
        'Trebuchet MS',
        'Verdana'
    ];
    const fontSizes = [
        '10px',
        '11px',
        '12px',
        '13px',
        '14px',
        '15px',
        '16px',
        '17px',
        '18px',
        '19px',
        '20px'
    ];
    const INSERT_BUTTONS = [
        {
            text: "Rule",
            command: "INSERT_RULE",
            props: null,
            directCommand: true
        },
        {
            text: "Image",
            command: () => setImageToolbar(true),
            props: null,
            directCommand: false
        },
        {
            text: "Tweet",
            command: () => setTweetToolbar(true),
            props: null,
            directCommand: false
        },
        {
            text: "Video",
            command: () => setVideoToolbar(true),
            props: null,
            directCommand: false
        },
        {
            text: "Table",
            command: insertTable,
            props: null,
            directCommand: false
        },
        {
            text: "Latex",
            command: "INSERT_EQUATION",
            props: {
                equation: 'f(x)',
                inline: true
            },
            directCommand: true
        },
        {
            text: "Excalidraw",
            command: "INSERT_EXCALIDRAW",
            props: null,
            directCommand: true
        },
        {
            text: "Citation block",
            command: "INSERT_CITE_QUOTE",
            props: {
                author: { name: 'Shakespeare', link: 'https://en.wikipedia.org/wiki/William_Shakespeare' },
                source: { content: QUOTE_STATE, link: 'https://en.wikipedia.org/wiki/Romeo_and_Juliet' }
            },
            directCommand: true
        }
    ];
    const CODE_LANGUAGE_OPTIONS = [
        { value: '', name: '- Select language -' },
        { value: 'c', name: 'C' },
        { value: 'clike', name: 'C-like' },
        { value: 'css', name: 'CSS' },
        { value: 'html', name: 'HTML' },
        { value: 'js', name: 'JavaScript' },
        { value: 'markdown', name: 'Markdown' },
        { value: 'objc', name: 'Objective-C' },
        { value: 'plain', name: 'Plain Text' },
        { value: 'py', name: 'Python' },
        { value: 'rust', name: 'Rust' },
        { value: 'sql', name: 'SQL' },
        { value: 'swift', name: 'Swift' },
        { value: 'xml', name: 'XML' },
    ];
    const SUPPORT_SPEECH_RECOGNITION = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    let text = "";
    let insertFn = null;
    let cancelFn = null;
    const altToolbar = isTweetToolbar || isVideoToolbar || isImageToolbar;
    if (altToolbar) {
        text = isTweetToolbar ? "Insert Tweet" : (isVideoToolbar ? "Insert Video" : "Insert image");
        insertFn = isTweetToolbar ? insertTweet : (isVideoToolbar ? insertVideo : insertImage);
        cancelFn = isTweetToolbar ? toggleTweetToolbar : (isVideoToolbar ? toggleVideoToolbar : toggleImageToolbar);
    }
    return (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => containerRef.current.clear(), children: "Clear" }), _jsx("button", { onClick: () => setEditorState(containerRef.current.getContent()), children: "Content" }), BUTTON_ELEMENTS.map(elem => (_jsxs("button", { onClick: () => containerRef.current.executeCommand(elem.command, elem.props), children: [elem.text, " ", elem.isActive ? "(X)" : ""] }, elem.text))), _jsx("br", {}), INSERT_BUTTONS.map(elem => (_jsx("button", { onClick: () => elem.directCommand ? containerRef.current.executeCommand(elem.command, elem.props) : elem.command(), children: elem.text }, elem.text))), _jsx("br", {}), _jsx("div", { children: formats.blockType === "code" ? (_jsxs(_Fragment, { children: [_jsxs("select", { name: "block-format", id: "block-format-select", value: blockFormatMap[formats.blockType], onChange: (e) => blockFormatChangeFn(e.target.value), children: [_jsx("option", { value: "", children: "--Please choose an option--" }), BLOCK_FORMATS.map(fmt => (_jsx("option", { value: fmt.value, children: fmt.name }, fmt.value)))] }), _jsx("select", { name: "code-format", id: "code-format-select", value: CODE_LANGUAGE_OPTIONS.find(p => p.value === formats.codeLanguage).value, onChange: (e) => codeLanguageChange(e.target.value), children: CODE_LANGUAGE_OPTIONS.map(cl => (_jsx("option", { value: cl.value, children: cl.name }, cl.value))) })] })) : (_jsxs("div", { children: [_jsxs("select", { name: "block-format", id: "block-format-select", value: blockFormatMap[formats.blockType], onChange: (e) => blockFormatChangeFn(e.target.value), children: [_jsx("option", { value: "", children: "--Please choose an option--" }), BLOCK_FORMATS.map(fmt => (_jsx("option", { value: fmt.value, children: fmt.name }, fmt.value)))] }), _jsx("select", { name: "font-family-select", id: "font-family-select", value: formats.fontFamily, onChange: (e) => fontFamilyChangeFn(e.target.value), children: fontFamilyOptions.map(f => _jsx("option", { value: f, children: f }, f)) }), _jsx("select", { name: "font-size-select", id: "font-size-select", value: formats.fontSize, onChange: (e) => fontSizeChange(e.target.value), children: fontSizes.map(f => _jsx("option", { value: f, children: f }, f)) })] })) }), _jsx("div", { children: SUPPORT_SPEECH_RECOGNITION ? (_jsxs("button", { onClick: () => {
                        containerRef.current.executeCommand("SPEECH_TO_TEXT", !isSpeechToText);
                        setIsSpeechToText(!isSpeechToText);
                    }, children: ["SPEECH TO TEXT ", isSpeechToText ? "(X)" : ""] })) : null }), _jsx("br", {}), _jsx("br", {}), altToolbar &&
                _jsxs(_Fragment, { children: [_jsx(URLToolbar, { insertFn: insertFn, cancelFn: cancelFn, setUrl: setUrl, text: text }), _jsx("hr", {})] }), _jsx(Editor, { containerRef: containerRef, setFormats: setFormats, config: config }), _jsx("br", {}), _jsxs("div", { style: { display: 'flex' }, children: [_jsxs("span", { style: { marginRight: '40px' }, children: [_jsx("p", { children: "Color picker" }), _jsx(SketchPicker, { color: formats.fontColor, onChange: fontColorSelect })] }), _jsxs("span", { children: [_jsx("p", { children: "Background color picker" }), _jsx(SketchPicker, { color: formats.bgColor, onChange: bgColorSelect })] })] }), _jsx("br", {}), _jsx("div", { children: editorState === null ? "<Nothing to render>" : JSON.stringify(editorState) })] }));
};
EditorComposer.storyName = 'Composer editor';
