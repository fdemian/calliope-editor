import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import Editor from '../Calliope/CalliopeEditor';
import { initialMentions } from './mentionsData';
export const EntryEditor = ({ readOnly, initialState, setFormats }) => {
    const containerRef = useRef(null);
    const [suggestions, setSuggestions] = useState(initialMentions);
    const onSearchChange = (match) => {
        if (match && match.matchingString) {
            const stringMatch = match.matchingString;
            const newSuggestions = initialMentions.filter(p => p.name.includes(stringMatch));
            setSuggestions(newSuggestions);
        }
    };
    const config = {
        placeholderText: 'Ingrese texto...',
        initialState: initialState,
        readOnly: readOnly,
        autoFocus: false,
        onError: (error) => {
            throw error;
        },
        plugins: [],
        citation: {
            sourceLinkComponent: ({ sourceLink }) => (_jsx(_Fragment, { children: _jsx("a", { href: sourceLink, children: "[source]" }) }))
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
    return (_jsxs("div", { className: "App", children: [_jsx("br", {}), _jsx("br", {}), _jsx("h2", { children: "EDITOR READ ONLY" }), _jsx("div", { style: { border: '1px solid black' }, children: _jsx(Editor, { containerRef: containerRef, setFormats: setFormats, config: config }) })] }));
};
