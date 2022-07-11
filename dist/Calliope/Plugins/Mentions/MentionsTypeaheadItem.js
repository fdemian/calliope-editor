import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */
import { useRef } from 'react';
// $FlowFixMe
const MentionsTypeaheadItem = ({ index, isSelected, onClick, onMouseEnter, onMouseLeave, result, entryComponent }) => {
    const liRef = useRef(null);
    let className = 'item';
    if (isSelected) {
        className += ' selected';
    }
    const EntryComponent = entryComponent;
    return (_jsx("li", { tabIndex: -1, className: className, ref: liRef, role: "option", "aria-selected": isSelected, id: 'typeahead-item-' + index, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, onClick: onClick, children: _jsx(EntryComponent, { avatar: result.avatar, name: result.name, link: result.link }) }, result.name));
};
export default MentionsTypeaheadItem;
