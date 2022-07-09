import React, { useRef, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Editor from '../Calliope/CalliopeEditor.tsx';
import {initialMentions} from './mentionsData';

export const EntryEditor: React.VFC = ({ readOnly, initialState, setFormats }) => {

  const containerRef = useRef(null);
  const [suggestions, setSuggestions] = useState(initialMentions);

  const onSearchChange = (match) => {
    if(match && match.matchingString) {
      const stringMatch = match.matchingString;
      const newSuggestions = initialMentions.filter(p => p.name.includes(stringMatch));
      setSuggestions(newSuggestions);
    }
  }

  const config = {
    placeholderText: 'Ingrese texto...',
    initialState: initialState,
    readOnly: readOnly,
    onError: (error) => {
      throw error;
    },
    plugins:[],
    citation: {
      sourceLinkComponent: ({ sourceLink }) => (
      <>
        <a href={sourceLink}>[source]</a>
      </>
      )
    },
    mentions: {
      onSearchChange: onSearchChange,
      onAddMention: (mention) => {
        console.clear();
        console.log(mention);
      },
      entryComponent: ({avatar, name, link}) => (
       <>
        &nbsp; <strong>{name}</strong>
       </>
      ),
      mentionsData: suggestions
    }
  };

  return (
  <div className="App">
    <br />
    <br />
    <h2>EDITOR READ ONLY</h2>
    <div style={{border: '1px solid black'}}>
      <Editor
        containerRef={containerRef}
        setFormats={setFormats}
        config={config}
      />
    </div>
 </div>
 );
}
