import { FC } from 'react';
import { RenderLeafProps } from 'slate-react';

const InlineText: FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
  if (leaf.properties?.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.properties?.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.properties?.undeline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

export default InlineText;
