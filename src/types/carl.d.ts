type CarlTextProperties = {
  bold?: boolean;
  italic?: boolean;
  undeline?: boolean;
};
type CarlText = {
  text: string;
  properties?: CarlTextProperties;
};

type CarlParagraphType = 'paragraph';
type CarlParagraph = {
  type: CarlParagraphType;
  children: CarlText[];
  properties?: {};
  id?: string;
};

type CarlHeadingType = 'heading';
type CarlHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type CarlHeadingProperties = {
  level?: CarlHeadingLevel;
};
type CarlHeading = {
  type: CarlHeadingType;
  children: CarlText[];
  properties?: CarlHeadingProperties;
  id?: string;
};

type CarlBulletedListItemType = 'bulleted-list-item';
type CarlBulletedListItem = {
  type: CarlBulletedListItemType;
  children: CarlText[];
  properties?: {};
  id?: string;
};

type CarlNumberedListItemType = 'numbered-list-item';
type CarlNumberedListItem = {
  type: CarlNumberedListItemType;
  children: CarlText[];
  properties?: {};
  id?: string;
};

type CarlCheckListItemType = 'check-list-item';
type CarlCheckListItemProperties = {
  checked?: boolean;
};
type CarlCheckListItem = {
  type: CarlCheckListItemType;
  children: CarlText[];
  properties?: CarlCheckListItemProperties;
  id?: string;
};

type CarlListItemType =
  | CarlBulletedListItemType
  | CarlNumberedListItemType
  | CarlCheckListItemType;

type CarlQuoteType = 'quote';
type CarlQuote = {
  type: CarlQuoteType;
  children: CarlText[];
  properties?: {};
  id?: string;
};

type CarlDividerType = 'divider';
type CarlDivider = {
  type: CarlDividerType;
  children: CarlText[];
  properties?: {};
  id?: string;
};

type CarlImageType = 'image';
type CarlImageProperties = {
  src?: string;
};
type CarlImage = {
  type: CarlImageType;
  children: CarlText[];
  properties?: CarlImageProperties;
  id?: string;
};

type CarlElement =
  | CarlParagraph
  | CarlHeading
  | CarlBulletedListItem
  | CarlNumberedListItem
  | CarlCheckListItem
  | CarlQuote
  | CarlDivider
  | CarlImage;
