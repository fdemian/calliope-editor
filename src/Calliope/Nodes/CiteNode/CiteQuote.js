import React, { useContext } from 'react';
import { CalliopeContext } from '../../CalliopeEditor';
import CiteTextEditor from './CiteTextEditor';
import { createEditor } from 'lexical';
import './CiteQuote.css';

const DefaultSourceComp = ({ sourceLink }) => <a href={sourceLink}>{sourceLink}</a>;

const CiteQuote = ({author, source }) => {

  const calliopeConfig = useContext(CalliopeContext);

  const {
    citation,
    nodes,
    plugins
   } = calliopeConfig;
  const { sourceLinkComponent } = citation;
  const SourceComp = sourceLinkComponent;
  const SourceLinkComp = SourceComp ? SourceComp : DefaultSourceComp;
  const citeEditor = createEditor({
    isReadOnly: calliopeConfig.readOnly,
    initialState: source.content
  });

  return (
  <figure>
    <figcaption>
       <a href={author.link}>{author.name}</a>
       <cite>
         &nbsp;
         <SourceLinkComp sourceLink={source.link} />
       </cite>
    </figcaption>
    <blockquote>
      <CiteTextEditor
        citeEditor={citeEditor}
        plugins={[]}
        config={calliopeConfig}
        content={source.content}
      />
    </blockquote>
  </figure>
  );
}

export default CiteQuote;
