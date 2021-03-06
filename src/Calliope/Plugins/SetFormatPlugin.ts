import { useEffect, useCallback } from 'react';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {
$getSelection,
$isRangeSelection,
COMMAND_PRIORITY_CRITICAL,
SELECTION_CHANGE_COMMAND
} from 'lexical';
import {$getNearestNodeOfType} from '@lexical/utils';
import {$isListNode, ListNode} from '@lexical/list';
import {$isCodeNode} from '@lexical/code';
import {$isLinkNode} from '@lexical/link';
import {$isHeadingNode} from '@lexical/rich-text';
import {
 $isAtNodeEnd,
 $getSelectionStyleValueForProperty,
 $isParentElementRTL
} from '@lexical/selection';

const CODE_LANGUAGE_MAP = {
  javascript: 'js',
  md: 'markdown',
  plaintext: 'plain',
  python: 'py',
  text: 'plain',
};

function getSelectedNode(selection: RangeSelection): TextNode | ElementNode {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

const SetFormatPlugin = ({internalFormat, setInternalFormat, setFormats}) => {
  const [editor] = useLexicalComposerContext();

  const getEditorFormats = useCallback(() => {
    let isLink = false;
    let selectedElementKey = false;
    let blockType = null;
    let codeLanguage = '';

    let _formats = {...internalFormat};
    const selection = $getSelection();

    //
    let fontSize = '15px';
    let fontColor = '#000';
    let bgColor = '#fff';
    let fontFamily = 'Arial';

    try {
      fontSize = $getSelectionStyleValueForProperty(selection, 'font-size', '15px');
      fontColor = $getSelectionStyleValueForProperty(selection, 'color', '#000');
      bgColor = $getSelectionStyleValueForProperty(selection, 'background-color', '#fff');
      fontFamily =  $getSelectionStyleValueForProperty(selection, 'font-family', 'Arial');
    }
    catch {
      console.log("[ERROR] - $getSelectionStyleValueForProperty");
    }

    if ($isRangeSelection(selection)) {

      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);


      if (elementDOM !== null) {
        selectedElementKey = elementKey;

        if ($isListNode(element)) {
           const parentList = $getNearestNodeOfType(
              anchorNode,
              ListNode,
           );
           const type = parentList
              ? parentList.getListType()
              : element.getListType();
              blockType = type;
            } else {
              const type = $isHeadingNode(element)
                ? element.getTag()
                : element.getType();
               blockType = type;

               if ($isCodeNode(element)) {
                 const language = element.getLanguage();
                 codeLanguage = language ? CODE_LANGUAGE_MAP[language] || language : '';
              }
            }
          }

    // Update links
     const node = getSelectedNode(selection);
     const parent = node.getParent();
     if ($isLinkNode(parent) || $isLinkNode(node)) {
      isLink = true;
     }

     // Update text format
     _formats = {
       ...internalFormat,
       isLink: isLink,
       blockType: blockType,
       selectedElementKey: selectedElementKey,
       codeLanguage: codeLanguage,
       isBold: selection.hasFormat('bold'),
       isItalic: selection.hasFormat('italic'),
       isUnderline: selection.hasFormat('underline'),
       isStrikethrough: selection.hasFormat('strikethrough'),
       isSubscript: selection.hasFormat('subscript'),
       isSuperscript: selection.hasFormat('superscript'),
       isCode: selection.hasFormat('code'),
       isRTL: $isParentElementRTL(selection),
       fontSize: fontSize,
       fontColor: fontColor,
       bgColor: bgColor,
       fontFamily: fontFamily
     }
   }
   return _formats;

 }, [editor, internalFormat]);

  useEffect(() => {
      return editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          const _formats = getEditorFormats(editor);
          setFormats(_formats);
          setInternalFormat(_formats);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      );
    }, [
      editor,
      internalFormat,
      getEditorFormats,
      setFormats,
      setInternalFormat
  ]);

  return null;
}


export default SetFormatPlugin;
