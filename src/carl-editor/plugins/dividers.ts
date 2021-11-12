import { Editor, Path, Range, Transforms } from 'slate';

const withDividers = (editor: Editor): Editor => {
  const { isVoid, insertBreak } = editor;

  editor.isVoid = (element) =>
    element.type === 'divider' ? true : isVoid(element);

  editor.insertBreak = () => {
    let dividerPath: Path | undefined = undefined;

    const { selection } = editor;

    const entry = Editor.above<CarlElement>(editor, {
      match: (node) => Editor.isBlock(editor, node),
      mode: 'lowest',
    });

    if (entry && selection && Range.isCollapsed(selection)) {
      const [element, path] = entry;
      const start = Editor.start(editor, path);
      const range = { anchor: selection.anchor, focus: start };

      if (
        Editor.isBlock(editor, element) &&
        Editor.string(editor, range) === '---'
      ) {
        Transforms.select(editor, range);
        dividerPath = path;
      }
    }
    insertBreak();
    if (dividerPath) {
      Transforms.setNodes(editor, { type: 'divider' }, { at: dividerPath });
    }
  };

  return editor;
};

export default withDividers;
