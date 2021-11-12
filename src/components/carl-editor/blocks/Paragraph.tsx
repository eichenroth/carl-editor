import { FC } from 'react';
import { Node } from 'slate';
import { RenderElementProps, useSelected } from 'slate-react';
import Placeholder from './common/Placeholder';

type ParagraphProps = RenderElementProps & {
  element: CarlParagraph;
};

const Paragraph: FC<ParagraphProps> = ({ attributes, children, element }) => {
  const selected = useSelected();
  const empty = Node.string(element) === '';

  return (
    <p className="mb-4" {...attributes}>
      {selected && empty && <Placeholder placeholder="Type '/' for commands" />}
      {children}
    </p>
  );
};

export default Paragraph;
