import { Editor } from 'slate';

const withImages = (editor: Editor): Editor => {
  const { isVoid } = editor;

  editor.isVoid = (element) =>
    element.type === 'image' ? true : isVoid(element);

  return editor;
};

export default withImages;
