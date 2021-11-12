import { Button, Card, Input, Row } from 'antd';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { IoImageOutline } from 'react-icons/io5';
import { Transforms } from 'slate';
import {
  ReactEditor,
  RenderElementProps,
  useFocused,
  useSelected,
  useSlate,
} from 'slate-react';
import validUrl from 'valid-url';

type ImageProps = RenderElementProps & {
  element: CarlImage;
};

const Image: FC<ImageProps> = ({ attributes, children, element }) => {
  const src = element.properties?.src;
  const isSrcValid = !!(src && validUrl.isWebUri(src));

  const editor = useSlate();
  const selected = useSelected();
  const focused = useFocused();
  // cannot memoize the path here, so we need to get it on demand
  const getCurrentPath = () => ReactEditor.findPath(editor, element);

  const handleSrcChange = (src?: string) => {
    Transforms.setNodes(
      editor,
      {
        properties: { ...element.properties, src },
      },
      { at: getCurrentPath() }
    );
  };

  return (
    <div {...attributes}>
      <div className="mb-4" contentEditable={false}>
        {isSrcValid && (
          <img
            className={classNames('mx-auto block max-w-full', {
              'ring ': selected && focused,
            })}
            src={src}
            width="70%"
          />
        )}
        {!isSrcValid && (
          <ImagePlaceholder
            setSrc={handleSrcChange}
            highlighted={selected && focused}
          />
        )}
      </div>
      {children}
    </div>
  );
};

type ImagePlaceholderProps = {
  setSrc: (src: string) => void;
  highlighted: boolean;
};

const ImagePlaceholder: FC<ImagePlaceholderProps> = ({
  setSrc,
  highlighted,
}) => {
  const [imageSrc, setImageSrc] = useState('');

  return (
    <Card
      className={classNames('w-8/12 mx-auto px-8 bg-gray-100', {
        'ring ': highlighted,
      })}
    >
      <Row className="text-gray-500 mb-4" justify="center" align="middle">
        <IoImageOutline className="text-3xl mr-2" />
        Add an image
      </Row>
      <Input.Group className="flex" compact>
        <Input
          className="flex-grow h-8 py-0.5"
          placeholder="https://"
          value={imageSrc}
          onChange={(e) => setImageSrc(e.target.value)}
        />
        <Button
          className="h-8 py-0.5"
          onClick={() => setSrc(imageSrc)}
          type="primary"
        >
          Embed image
        </Button>
      </Input.Group>
    </Card>
  );
};

export default Image;
