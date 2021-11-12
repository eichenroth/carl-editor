import {
  CopyOutlined,
  DeleteOutlined,
  MenuOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import { Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';

type BlockActionThingyProps = {
  element: CarlElement;
  className?: string;
};

const BlockActionThingy: FC<BlockActionThingyProps> = ({
  element,
  className,
}) => {
  const editor = useSlate();
  // cannot memoize the path here, so we need to get it on demand
  const getCurrentPath = () => ReactEditor.findPath(editor, element);

  const blockMenu = (
    <Menu className="w-36">
      <Menu.Item
        key="delete"
        icon={<DeleteOutlined />}
        onClick={() => Transforms.removeNodes(editor, { at: getCurrentPath() })}
      >
        Delete
      </Menu.Item>
      <Menu.Item
        key="copy"
        icon={<CopyOutlined />}
        onClick={() =>
          Transforms.insertNodes(
            editor,
            { ...element },
            { at: getCurrentPath() }
          )
        }
      >
        Duplicate
      </Menu.Item>
      <Menu.SubMenu
        key="turn-into"
        icon={<SyncOutlined />}
        title="Turn into"
        popupClassName="w-36"
        popupOffset={[0, 0]}
      >
        <Menu.Item
          key="turn-into-paragraph"
          onClick={() =>
            Transforms.setNodes(
              editor,
              { type: 'paragraph' },
              { at: getCurrentPath() }
            )
          }
        >
          Paragraph
        </Menu.Item>
        <Menu.Divider className="my-0.5" />
        <Menu.Item
          key="turn-into-heading-1"
          onClick={() =>
            Transforms.setNodes(
              editor,
              {
                type: 'heading',
                properties: { ...element.properties, level: 1 },
              },
              { at: getCurrentPath() }
            )
          }
        >
          Heading 1
        </Menu.Item>
        <Menu.Item
          key="turn-into-heading-2"
          onClick={() =>
            Transforms.setNodes(
              editor,
              {
                type: 'heading',
                properties: { ...element.properties, level: 2 },
              },
              { at: getCurrentPath() }
            )
          }
        >
          Heading 2
        </Menu.Item>
        <Menu.Item
          key="turn-into-heading-3"
          onClick={() =>
            Transforms.setNodes(
              editor,
              {
                type: 'heading',
                properties: { ...element.properties, level: 3 },
              },
              { at: getCurrentPath() }
            )
          }
        >
          Heading 3
        </Menu.Item>
        <Menu.Divider className="my-0.5" />
        <Menu.Item
          key="turn-into-check-list-item"
          onClick={() =>
            Transforms.setNodes(
              editor,
              { type: 'check-list-item' },
              { at: getCurrentPath() }
            )
          }
        >
          To-do list
        </Menu.Item>
        <Menu.Item
          key="turn-into-bulleted-list-item"
          onClick={() =>
            Transforms.setNodes(
              editor,
              { type: 'bulleted-list-item' },
              { at: getCurrentPath() }
            )
          }
        >
          Bulleted list
        </Menu.Item>
        <Menu.Item
          key="turn-into-numbered-list-item"
          onClick={() =>
            Transforms.setNodes(
              editor,
              { type: 'numbered-list-item' },
              { at: getCurrentPath() }
            )
          }
        >
          Numbered list
        </Menu.Item>
        <Menu.Divider className="my-0.5" />
        <Menu.Item
          key="turn-into-quote"
          onClick={() =>
            Transforms.setNodes(
              editor,
              { type: 'quote' },
              { at: getCurrentPath() }
            )
          }
        >
          Quote
        </Menu.Item>
        <Menu.Item
          key="turn-into-divider"
          onClick={() =>
            Transforms.setNodes(
              editor,
              { type: 'divider' },
              { at: getCurrentPath() }
            )
          }
        >
          Divider
        </Menu.Item>
        <Menu.Item
          key="turn-into-image"
          onClick={() =>
            Transforms.setNodes(
              editor,
              { type: 'image' },
              { at: getCurrentPath() }
            )
          }
        >
          Image
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  const btnClassName = classNames(
    'h-6 w-6 p-0 border-0 text-gray-400 hover:bg-suttle',
    className
  );

  return (
    <Dropdown overlay={blockMenu} placement="bottomLeft">
      <Button
        className={btnClassName}
        type="text"
        icon={<MenuOutlined className="text-sm h-3.5" />}
      />
    </Dropdown>
  );
};

export default BlockActionThingy;
