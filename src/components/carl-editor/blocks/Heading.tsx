import { FC } from 'react';
import { Node } from 'slate';
import { RenderElementProps } from 'slate-react';
import Placeholder from './common/Placeholder';

type HeadingProps = RenderElementProps & {
  element: CarlHeading;
};

const Heading: FC<HeadingProps> = ({ attributes, children, element }) => {
  const level = element.properties?.level || 1;

  const empty = Node.string(element) === '';

  const childrenWithPlaceholder = (
    <>
      {empty && <Placeholder placeholder={`Heading ${level}`} />}
      {children}
    </>
  );

  if (level === 1)
    return (
      <h1 className="mb-4 text-3xl leading-none" {...attributes}>
        {childrenWithPlaceholder}
      </h1>
    );
  if (level === 2)
    return (
      <h2 className="mb-4 text-3xl leading-none" {...attributes}>
        {childrenWithPlaceholder}
      </h2>
    );
  if (level === 3)
    return (
      <h3 className="mb-4 text-3xl leading-none" {...attributes}>
        {childrenWithPlaceholder}
      </h3>
    );
  if (level === 4)
    return (
      <h4 className="mb-4 text-3xl leading-none" {...attributes}>
        {childrenWithPlaceholder}
      </h4>
    );
  if (level === 5)
    return (
      <h5 className="mb-4 text-3xl leading-none" {...attributes}>
        {childrenWithPlaceholder}
      </h5>
    );
  return (
    <h6 className="mb-4 text-3xl leading-none" {...attributes}>
      {childrenWithPlaceholder}
    </h6>
  );
};

export default Heading;
