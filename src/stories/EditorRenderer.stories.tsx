import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EntryEditor } from './EntryEditor.tsx';

const INITIAL_STATE = "{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Normal text.\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":1,\"mode\":\"normal\",\"style\":\"\",\"text\":\" Bold text\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\" .\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":2,\"mode\":\"normal\",\"style\":\"\",\"text\":\" Italic text. \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":8,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Underlined text\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\" . \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":4,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Strikethrough text\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\" . Superscript\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":64,\"mode\":\"normal\",\"style\":\"\",\"text\":\"text\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\" Subscript\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":32,\"mode\":\"normal\",\"style\":\"\",\"text\":\"text\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\" . \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":16,\"mode\":\"normal\",\"style\":\"\",\"text\":\"code()\",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\" some of this text \",\"type\":\"text\",\"version\":1},{\"text\":\"will be hidden in spoilers.\",\"type\":\"spoiler-inline\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\". \",\"type\":\"text\",\"version\":1},{\"text\":\"ctrl\",\"type\":\"kbdnode\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\" + \",\"type\":\"text\",\"version\":1},{\"text\":\"v\",\"type\":\"kbdnode\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\".\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"type\":\"horizontalrule\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"color: #777877;\",\"text\":\"The text above is separated by a rule element.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"color: #15ed12;\",\"text\":\"This text is colored green. \",\"type\":\"text\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"color: #000000;background-color: #ed0c5a;\",\"text\":\"This text has a red background.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"type\":\"horizontalrule\",\"version\":1},{\"children\":[{\"altText\":\"\",\"caption\":{\"editorState\":{\"root\":{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}},\"height\":0,\"maxWidth\":500,\"showCaption\":false,\"src\":\"https://en.wikipedia.org/wiki/File:Romeo_and_juliet_brown.jpg\",\"type\":\"image\",\"version\":1,\"width\":0},{\"altText\":\"\",\"caption\":{\"editorState\":{\"root\":{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Romeo and Juliet\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}},\"height\":0,\"maxWidth\":500,\"showCaption\":true,\"src\":\"https://upload.wikimedia.org/wikipedia/commons/5/55/Romeo_and_juliet_brown.jpg\",\"type\":\"image\",\"version\":1,\"width\":0}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"format\":\"\",\"type\":\"tweet\",\"version\":1,\"id\":\"1545769755411357696\"},{\"children\":[{\"equation\":\"f(x) = 2\",\"inline\":true,\"type\":\"equation\",\"version\":1},{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\" is certainly a function.\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"This\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":3},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"is \",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"A \",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"Table\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"and \",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"I \",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":1},{\"children\":[{\"children\":[{\"detail\":0,\"format\":0,\"mode\":\"normal\",\"style\":\"\",\"text\":\"hate mondays\",\"type\":\"text\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":2},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":2},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":2},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":2},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":2},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1},{\"children\":[{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":2},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0},{\"children\":[{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablecell\",\"version\":1,\"headerState\":0}],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"tablerow\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"table\",\"version\":1},{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1},{\"authorName\":\"Shakespeare\",\"authorLink\":\"https://en.wikipedia.org/wiki/William_Shakespeare\",\"sourceContent\":\"{\\\"root\\\":{\\\"children\\\":[{\\\"children\\\":[{\\\"detail\\\":0,\\\"format\\\":2,\\\"mode\\\":\\\"normal\\\",\\\"style\\\":\\\"color: rgb(24, 24, 24);background-color: rgb(255, 255, 255);\\\",\\\"text\\\":\\\"These violent delights have violent ends\\\",\\\"type\\\":\\\"text\\\",\\\"version\\\":1},{\\\"type\\\":\\\"linebreak\\\",\\\"version\\\":1},{\\\"detail\\\":0,\\\"format\\\":2,\\\"mode\\\":\\\"normal\\\",\\\"style\\\":\\\"color: rgb(24, 24, 24);background-color: rgb(255, 255, 255);\\\",\\\"text\\\":\\\"And in their triump die, like fire and powder\\\",\\\"type\\\":\\\"text\\\",\\\"version\\\":1},{\\\"type\\\":\\\"linebreak\\\",\\\"version\\\":1},{\\\"detail\\\":0,\\\"format\\\":2,\\\"mode\\\":\\\"normal\\\",\\\"style\\\":\\\"color: rgb(24, 24, 24);background-color: rgb(255, 255, 255);\\\",\\\"text\\\":\\\"Which, as they kiss, consume\\\",\\\"type\\\":\\\"text\\\",\\\"version\\\":1}],\\\"direction\\\":\\\"ltr\\\",\\\"format\\\":\\\"\\\",\\\"indent\\\":0,\\\"type\\\":\\\"paragraph\\\",\\\"version\\\":1}],\\\"direction\\\":\\\"ltr\\\",\\\"format\\\":\\\"\\\",\\\"indent\\\":0,\\\"type\\\":\\\"root\\\",\\\"version\\\":1}}\",\"sourceLink\":\"https://en.wikipedia.org/wiki/Romeo_and_Juliet\",\"type\":\"cite-node\",\"version\":1},{\"children\":[],\"direction\":null,\"format\":\"\",\"indent\":0,\"type\":\"paragraph\",\"version\":1}],\"direction\":\"ltr\",\"format\":\"\",\"indent\":0,\"type\":\"root\",\"version\":1}}";


export default {
  title: 'Editor/Read Only',
  component: EntryEditor,
  parameters: {},
} as ComponentMeta<typeof EntryEditor>;

const args = {
 initialState: INITIAL_STATE,
 readOnly: true,
 setFormats: () => {}
};

export const EditorReadOnly = () => <EntryEditor {...args} />;
EditorReadOnly.storyName = 'Read only editor';