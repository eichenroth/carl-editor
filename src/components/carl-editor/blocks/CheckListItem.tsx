import { Checkbox } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import { Node, Transforms } from 'slate';
import { ReactEditor, RenderElementProps, useSlate } from 'slate-react';
import Placeholder from './common/Placeholder';

type CheckListItemProps = RenderElementProps & {
  element: CarlCheckListItem;
};

const CheckListItem: FC<CheckListItemProps> = ({
  attributes,
  children,
  element,
}) => {
  const editor = useSlate();

  const changeChecked = (checked: boolean) => {
    const path = ReactEditor.findPath(editor, element);
    const properties: Partial<CarlCheckListItemProperties> = {
      ...element.properties,
      checked,
    };
    Transforms.setNodes(editor, { properties }, { at: path });
  };

  const empty = Node.string(element) === '';
  const checked = element.properties?.checked;

  const textClassName = classNames('flex-1', {
    'text-gray-600 line-through': checked,
  });

  return (
    <div className="mb-2" {...attributes}>
      <div className="flex">
        <div
          className="w-7 flex items-center flex-grow-0 flex-shrink-0 select-none"
          contentEditable={false}
        >
          <Checkbox
            checked={checked}
            onChange={(e) => changeChecked(e.target.checked)}
          />
        </div>
        <div className={textClassName}>
          {empty && <Placeholder placeholder="To-do" />}
          {children}
        </div>
      </div>
    </div>
  );
};

export default CheckListItem;
