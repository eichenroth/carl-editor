import { FC } from 'react';
import { Node } from 'slate';
import { RenderElementProps } from 'slate-react';
import Placeholder from './common/Placeholder';

type QuoteProps = RenderElementProps & {
  element: CarlQuote;
};

const Quote: FC<QuoteProps> = ({ attributes, children, element }) => {
  const empty = Node.string(element) === '';

  return (
    <blockquote
      className="pl-6 mb-2 italic border-0 border-l-4 border-gray-400 border-solid"
      {...attributes}
    >
      <p className="py-2">
        {empty && <Placeholder placeholder="Empty quote" />}
        {children}
      </p>
    </blockquote>
  );
};

export default Quote;
