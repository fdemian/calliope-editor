
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

export type CalliopeFormatTypes = {
  blockType: string,
  selectedElementKey: string | null,
  isLink: boolean,
  isBold: boolean,
  isItalic: boolean,
  isUnderline: boolean,
  isStrikethrough: boolean,
  isSubscript: boolean,
  isSuperscript: boolean,
  isCode: boolean,
  canUndo: boolean,
  canRedo: boolean,
  isRTL: boolean,
  codeLanguage: string,
  fontSize: string,
  fontColor: string,
  bgColor: string,
  fontFamily: string
};
