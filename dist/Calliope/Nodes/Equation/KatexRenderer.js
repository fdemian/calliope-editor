import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import katex from 'katex';
import { useEffect, useRef } from 'react';
export default function KatexRenderer({ equation, inline, onClick, }) {
    const katexElementRef = useRef(null);
    useEffect(() => {
        const katexElement = katexElementRef.current;
        if (katexElement !== null) {
            katex.render(equation, katexElement, {
                displayMode: !inline,
                errorColor: '#cc0000',
                output: 'html',
                strict: 'warn',
                throwOnError: false,
                trust: false,
            });
        }
    }, [equation, inline]);
    return (
    // We use spacers either side to ensure Android doesn't try and compose from the
    // inner text from Katex. There didn't seem to be any other way of making this work,
    // without having a physical space.
    _jsxs(_Fragment, { children: [_jsx("span", { className: "spacer", children: " " }), _jsx("span", { role: "button", tabIndex: -1, onClick: onClick, ref: katexElementRef }), _jsx("span", { className: "spacer", children: " " })] }));
}
