import { Editor, Point, Range, Transforms } from 'slate';

const SHORTCUTS = new Map<string, CarlListItemType>([
  ['*', 'bulleted-list-item'],
  ['-', 'bulleted-list-item'],
  ['+', 'bulleted-list-item'],
  ['1.', 'numbered-list-item'],
  ['[]', 'check-list-item'],
  ['[ ]', 'check-list-item'],
]);

const LIST_ITEM_TYPES = new Set<CarlListItemType>([
  'bulleted-list-item',
  'numbered-list-item',
  'check-list-item',
]);

const withListShortcuts = (editor: Editor): Editor => {
  const { insertText, deleteBackward, insertBreak } = editor;

  editor.insertText = (text) => {
    const { selection } = editor;
    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const entry = Editor.above<CarlElement>(editor, {
        match: (node) => Editor.isBlock(editor, node),
        mode: 'lowest',
      });

      if (entry) {
        const [element, path] = entry;
        const start = Editor.start(editor, path);
        const range = { anchor: selection.anchor, focus: start };
        const beforeText = Editor.string(editor, range);

        const type = SHORTCUTS.get(beforeText);

        if (type && Editor.isBlock(editor, element)) {
          // remove shortcut text
          Transforms.select(editor, range);
          Transforms.delete(editor);

          Transforms.setNodes(editor, { type }, { at: path });

          // prevent space from beeing entered
          return;
        }
      }
    }

    insertText(text);
  };

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const entry = Editor.above<CarlElement>(editor, {
        match: (node) => Editor.isBlock(editor, node),
        mode: 'lowest',
      });

      if (entry) {
        const [element, path] = entry;
        const start = Editor.start(editor, path);

        if (
          Editor.isBlock(editor, element) &&
          LIST_ITEM_TYPES.has(element.type as CarlListItemType) &&
          Point.equals(selection.anchor, start)
        ) {
          Transforms.setNodes(editor, { type: 'paragraph' }, { at: path });

          // prevent block from beeing removed
          return;
        }
      }
    }

    deleteBackward(...args);
  };

  editor.insertBreak = () => {
    const entry = Editor.above<CarlElement>(editor, {
      match: (node) => Editor.isBlock(editor, node),
      mode: 'lowest',
    });

    if (entry) {
      const [element, path] = entry;
      if (
        LIST_ITEM_TYPES.has(element.type as CarlListItemType) &&
        Editor.isEmpty(editor, element)
      ) {
        Transforms.setNodes(editor, { type: 'paragraph' }, { at: path });
        return;
      }
    }

    insertBreak();
  };

  return editor;
};

export default withListShortcuts;
