import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */
import { useRef } from 'react';
import { shortnameToUnicode } from 'emoji-toolkit';
// $FlowFixMe
const MentionsTypeaheadItem = ({ index, isSelected, onClick, onMouseEnter, onMouseLeave, result, }) => {
    const liRef = useRef(null);
    let className = 'item';
    if (isSelected) {
        className += ' selected';
    }
    return (_jsxs("li", { tabIndex: -1, className: className, ref: liRef, role: "option", "aria-selected": isSelected, id: 'typeahead-item-' + index, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, onClick: onClick, children: [_jsxs("span", { title: result, children: [shortnameToUnicode(result), " \u00A0"] }), _jsx("span", { children: result })] }, result));
};
export default MentionsTypeaheadItem;
