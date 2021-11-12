import { FC } from 'react';
import { RenderElementProps } from 'slate-react';
import CheckListItem from './CheckListItem';
import BlockActionThingy from './common/BlockActionThingy';
import Divider from './Divider';
import Heading from './Heading';
import Image from './Image';
import ListItem from './ListItem';
import Paragraph from './Paragraph';
import Quote from './Quote';

const Block: FC<RenderElementProps> = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'paragraph':
      return (
        <Paragraph attributes={attributes} element={element}>
          {children}
        </Paragraph>
      );
    case 'heading':
      return (
        <Heading attributes={attributes} element={element}>
          {children}
        </Heading>
      );
    case 'bulleted-list-item':
    case 'numbered-list-item':
      return (
        <ListItem attributes={attributes} element={element}>
          {children}
        </ListItem>
      );
    case 'check-list-item':
      return (
        <CheckListItem attributes={attributes} element={element}>
          {children}
        </CheckListItem>
      );
    case 'quote':
      return (
        <Quote attributes={attributes} element={element}>
          {children}
        </Quote>
      );
    case 'divider':
      return (
        <Divider attributes={attributes} element={element}>
          {children}
        </Divider>
      );
    case 'image':
      return (
        <Image attributes={attributes} element={element}>
          {children}
        </Image>
      );
    default:
      const errorElement = element as CarlElement;
      console.error('Cannot render block of type', errorElement.type);
      return <></>;
  }
};

const BlockWrapper: FC<RenderElementProps> = (props) => {
  const { element } = props;

  return (
    <div className="relative px-8 group">
      <BlockActionThingy
        element={element}
        className="absolute left-0 top-0 hidden group-hover:block"
      />
      <Block {...props} />
    </div>
  );
};

export default BlockWrapper;
