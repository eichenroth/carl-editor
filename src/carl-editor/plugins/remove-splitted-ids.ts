import { Editor, Transforms } from 'slate';

/**
 * Normally, when we insert a linebreak (or multiple at once),
 * the node gets split into two nodes with the same properties.
 * We do not want to keep the id in all nodes.
 */

// TODO create O(n) algorithm instread of O(n^2) algorithm
// Note: this following code seems to have an error

// const withRemoveSplittedIds = (editor: Editor): Editor => {
//   const { normalizeNode } = editor;

//   editor.normalizeNode = (entry) => {
//     const [node, path] = entry;

//     if (Editor.isBlock(editor, node) && node.id) {
//       const nextEntry = Editor.next(editor, {
//         at: path,
//         match: (node) => Editor.isBlock(editor, node),
//       });

//       if (nextEntry) {
//         const [nextNode] = nextEntry;
//         if (Editor.isBlock(editor, nextNode) && node.id === nextNode.id) {
//           Transforms.setNodes(editor, { id: undefined }, { at: path });
//         }
//       }
//     }

//     normalizeNode(entry);
//   };

//   return editor;
// };

const withRemoveSplittedIds = (editor: Editor): Editor => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    if (Editor.isBlock(editor, node) && node.id) {
      const { id } = node;
      const sameIdNode = Editor.next(editor, {
        at: path,
        match: (node) => Editor.isBlock(editor, node) && node.id === id,
      });
      if (sameIdNode) {
        Transforms.setNodes(editor, { id: undefined }, { at: path });
      }
    }

    normalizeNode(entry);
  };

  return editor;
};

export default withRemoveSplittedIds;
