import { Editor, Point, Range, Transforms } from 'slate';

const SHORTCUTS = new Map<string, CarlHeadingLevel>([
  ['#', 1],
  ['##', 2],
  ['###', 3],
  ['####', 4],
  ['#####', 5],
  ['######', 6],
]);

const withHeadingShortcuts = (editor: Editor): Editor => {
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

        const headingLevel = SHORTCUTS.get(beforeText);

        if (headingLevel && Editor.isBlock(editor, element)) {
          // remove shortcut text
          Transforms.select(editor, range);
          Transforms.delete(editor);

          Transforms.setNodes(
            editor,
            {
              type: 'heading',
              properties: { ...element.properties, level: headingLevel },
            },
            { at: path }
          );

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
      const entry = Editor.above(editor, {
        match: (node) => Editor.isBlock(editor, node),
        mode: 'lowest',
      });

      if (entry) {
        const [element, path] = entry;
        const start = Editor.start(editor, path);

        if (
          Editor.isBlock(editor, element) &&
          element.type === 'heading' &&
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
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const entry = Editor.above<CarlElement>(editor, {
        match: (node) => Editor.isBlock(editor, node),
        mode: 'lowest',
      });

      if (entry) {
        const [element, path] = entry;
        if (
          Editor.isBlock(editor, element) &&
          element.type === 'heading' &&
          Editor.isEmpty(editor, element)
        ) {
          Transforms.setNodes(editor, { type: 'paragraph' }, { at: path });
          // prevent insertBreak from getting called
          return;
        }

        insertBreak();
        const newBlock = Editor.above<CarlElement>(editor, {
          match: (node) => Editor.isBlock(editor, node),
          mode: 'lowest',
        });

        if (newBlock) {
          const [newElement, newPath] = newBlock;
          if (
            Editor.isBlock(editor, newElement) &&
            newElement.type === 'heading'
          ) {
            Transforms.setNodes(editor, { type: 'paragraph' }, { at: newPath });
          }
        }

        // prevent insertBreak from getting called again
        return;
      }
    }

    insertBreak();
  };

  return editor;
};

export default withHeadingShortcuts;
