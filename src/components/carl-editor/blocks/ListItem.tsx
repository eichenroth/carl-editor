import { FC } from 'react';
import { Editor, Node, Path } from 'slate';
import { ReactEditor, RenderElementProps, useSlate } from 'slate-react';
import Placeholder from './common/Placeholder';

const countPreviousSiblings = (
  editor: Editor,
  node: Node,
  path: Path
): number => {
  const [prevNode, prevPath] = Editor.previous(editor, {
    at: path,
    match: (sibling, siblingPath) =>
      Editor.isBlock(editor, node) &&
      Editor.isBlock(editor, sibling) &&
      node.type === sibling.type &&
      path.length === siblingPath.length &&
      path[path.length - 1] === siblingPath[siblingPath.length - 1] + 1,
  }) || [undefined, undefined];

  if (prevNode && prevPath) {
    return 1 + countPreviousSiblings(editor, prevNode, prevPath);
  }
  return 0;
};

type ListItemProps = RenderElementProps & {
  element: CarlBulletedListItem | CarlNumberedListItem;
};

const ListItem: FC<ListItemProps> = ({ attributes, children, element }) => {
  const editor = useSlate();
  const path = ReactEditor.findPath(editor, element);
  const previousSiblingCount = countPreviousSiblings(editor, element, path);

  const empty = Node.string(element) === '';

  return (
    <div className="mb-2" {...attributes}>
      <div className="flex">
        <div
          className="w-6 flex items-center justify-center flex-grow-0 flex-shrink-0 select-none"
          contentEditable={false}
        >
          {element.type === 'bulleted-list-item' && (
            <span className="text-xl leading-4">&bull;</span>
          )}
          {element.type === 'numbered-list-item' && (
            <>{previousSiblingCount + 1}.</>
          )}
        </div>
        <div className="flex-1">
          {empty && <Placeholder placeholder="List" />}
          {children}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
