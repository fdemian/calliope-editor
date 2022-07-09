import React from 'react';
import PropTypes from 'prop-types';
import { shortnameToUnicode } from 'emoji-toolkit';

const EmojiNode = ({emoji}) => {
  return (
  <span>{shortnameToUnicode(emoji)}</span>
  );
}

EmojiNode.propTypes = {
  emoji: PropTypes.string
};

export default EmojiNode;
