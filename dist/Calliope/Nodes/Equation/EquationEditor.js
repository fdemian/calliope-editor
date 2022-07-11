import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import './EquationEditor.css';
export default function EquationEditor({ equation, setEquation, inline, inputRef, }) {
    const onChange = (event) => {
        setEquation(event.target.value);
    };
    const props = {
        equation,
        inputRef,
        onChange,
    };
    return inline ? (_jsx(InlineEquationEditor, { ...props, inputRef: inputRef })) : (_jsx(BlockEquationEditor, { ...props, inputRef: inputRef }));
}
function InlineEquationEditor({ equation, onChange, inputRef, }) {
    return (_jsxs("span", { className: "EquationEditor_inputBackground", children: [_jsx("span", { className: "EquationEditor_dollarSign", children: "$" }), _jsx("input", { className: "EquationEditor_inlineEditor", value: equation, onChange: onChange, autoFocus: true, ref: inputRef }), _jsx("span", { className: "EquationEditor_dollarSign", children: "$" })] }));
}
function BlockEquationEditor({ equation, onChange, inputRef, }) {
    return (_jsxs("div", { className: "EquationEditor_inputBackground", children: [_jsx("span", { className: "EquationEditor_dollarSign", children: '$$\n' }), _jsx("textarea", { className: "EquationEditor_blockEditor", value: equation, onChange: onChange, ref: inputRef }), _jsx("span", { className: "EquationEditor_dollarSign", children: '\n$$' })] }));
}
