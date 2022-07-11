
type EntryProps = {
  avatar: string,
  name: string,
  link: string
};

type MentionObj = {
  avatar: string,
  name: string,
  link: string
};

type SourceLinkTypes = {
  sourceLink: string
};

type CalliopeConfigProps = {
  placeholderText: string,
  initialState: string,
  readOnly:boolean,
  autoFocus:boolean,
  onError: (error:any) => void,
  plugins: any,
  citation: {
    sourceLinkComponent: React.VFC<SourceLinkTypes>
  },
  mentions: {
    onSearchChange: (match: any) => void,
    onAddMention: (mention: MentionObj) => void,
    entryComponent: (entryProps: EntryProps) => void,
    mentionsData: suggestions,
  }
};

export type CalliopeEditorProps = {
  config: CalliopeConfigProps,
  containerRef: React.RefObject<HTMLDivElement>,
  setFormats: (formats:any) => void
}
