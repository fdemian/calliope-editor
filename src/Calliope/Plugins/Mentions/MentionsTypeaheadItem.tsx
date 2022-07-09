/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */
import React, { useRef } from 'react';
// $FlowFixMe
const MentionsTypeaheadItem = ({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  onMouseLeave,
  result,
  entryComponent
}: {
  index: number,
  isSelected: boolean,
  onClick: () => void,
  onMouseEnter: () => void,
  onMouseLeave: () => void,
  result: string,
}) => {
  const liRef = useRef(null);

  let className = 'item';
  if (isSelected) {
    className += ' selected';
  }

  const EntryComponent = entryComponent;

  return (
  <li
    key={result.name}
    tabIndex={-1}
    className={className}
    ref={liRef}
    role="option"
    aria-selected={isSelected}
    id={'typeahead-item-' + index}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}>
     <EntryComponent
       avatar={result.avatar}
       name={result.name}
       link={result.link}
     />
  </li>
  );
}

export default MentionsTypeaheadItem;
