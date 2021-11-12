import { KeyboardEvent, useCallback, useState } from 'react';
import { Editor, Path, Range, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

type Command = {
  name: string;
  transform: (editor: Editor, element: CarlElement, at: Path) => void;
};

const transformHeading = (
  editor: Editor,
  element: CarlElement,
  at: Path,
  level: 1 | 2 | 3 | 4 | 5 | 6
) =>
  Transforms.setNodes(
    editor,
    { type: 'heading', properties: { ...element.properties, level } },
    { at }
  );

const COMMANDS: Command[] = [
  {
    name: 'paragraph',
    transform: (editor, element, at) =>
      Transforms.setNodes(editor, { type: 'paragraph' }, { at }),
  },
  {
    name: 'heading1',
    transform: (editor, element, at) =>
      transformHeading(editor, element, at, 1),
  },
  {
    name: 'heading2',
    transform: (editor, element, at) =>
      transformHeading(editor, element, at, 2),
  },
  {
    name: 'heading3',
    transform: (editor, element, at) =>
      transformHeading(editor, element, at, 3),
  },
  {
    name: 'heading4',
    transform: (editor, element, at) =>
      transformHeading(editor, element, at, 4),
  },
  {
    name: 'heading5',
    transform: (editor, element, at) =>
      transformHeading(editor, element, at, 5),
  },
  {
    name: 'heading6',
    transform: (editor, element, at) =>
      transformHeading(editor, element, at, 6),
  },
  {
    name: 'todo-list',
    transform: (editor, element, at) =>
      Transforms.setNodes(editor, { type: 'check-list-item' }, { at }),
  },
  {
    name: 'bulleted-list',
    transform: (editor, element, at) =>
      Transforms.setNodes(editor, { type: 'bulleted-list-item' }, { at }),
  },
  {
    name: 'numbered-list',
    transform: (editor, element, at) =>
      Transforms.setNodes(editor, { type: 'numbered-list-item' }, { at }),
  },
  {
    name: 'quote',
    transform: (editor, element, at) =>
      Transforms.setNodes(editor, { type: 'quote' }, { at }),
  },
  {
    name: 'divider',
    transform: (editor, element, at) =>
      Transforms.setNodes(editor, { type: 'divider' }, { at }),
  },
  {
    name: 'image',
    transform: (editor, element, at) =>
      Transforms.setNodes(editor, { type: 'image' }, { at }),
  },
];

const useCommands = () => {
  const [target, setTarget] = useState<Range>();
  const [search, setSearch] = useState('');
  const [index, setIndex] = useState(0);
  const [domRect, setDomRect] = useState<DOMRect>();

  const lowerCaseSearch = search.toLocaleLowerCase();
  const filteredCommands = COMMANDS.filter((command) =>
    command.name.includes(lowerCaseSearch)
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, editor: Editor) => {
      if (target) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            setIndex(index >= filteredCommands.length - 1 ? 0 : index + 1);
            break;
          case 'ArrowUp':
            event.preventDefault();
            setIndex(index <= 0 ? filteredCommands.length - 1 : index - 1);
            break;
          case 'Tab':
          case 'Enter':
            event.preventDefault();
            Transforms.select(editor, target);
            Transforms.delete(editor);

            const entry = Editor.above<CarlElement>(editor, {
              match: (node) => Editor.isBlock(editor, node),
              mode: 'lowest',
              at: target,
            });
            if (filteredCommands.length > index && entry) {
              const [element, path] = entry;
              filteredCommands[index].transform(editor, element, path);
            }
            // insertMention(editor, chars[index]);
            setTarget(undefined);
            setDomRect(undefined);
            break;
          case 'Escape':
            event.preventDefault();
            setTarget(undefined);
            setDomRect(undefined);
            break;
        }
      }
    },
    [target, search, index]
  );

  const withCommands = (editor: Editor): Editor => {
    const { onChange } = editor;

    editor.onChange = () => {
      onChange();

      const { selection } = editor;
      if (selection && Range.isCollapsed(selection)) {
        const start = Range.start(selection);

        const wordBefore = Editor.before(editor, start, { unit: 'word' });
        const before = wordBefore && Editor.before(editor, wordBefore);
        const beforeRange = before && Editor.range(editor, before, start);
        const beforeText = beforeRange && Editor.string(editor, beforeRange);
        const beforeMatch = beforeText && beforeText.match(/^\/(\w+)$/);

        const after = Editor.after(editor, start);
        const afterRange = Editor.range(editor, start, after);
        const afterText = Editor.string(editor, afterRange);
        const afterMatch = afterText.match(/^(\s|$)/);

        if (beforeMatch && afterMatch && beforeRange) {
          setTarget(beforeRange);
          setSearch(beforeMatch[1]);
          setIndex(0);
          setDomRect(
            ReactEditor.toDOMRange(editor, beforeRange).getBoundingClientRect()
          );
          return;
        }

        setTarget(undefined);
      }
    };

    return editor;
  };

  return {
    withCommands,
    handleKeyDown,
    commandDropdown: {
      visible: !!target,
      commands: filteredCommands.map(({ name }) => name),
      search,
      index,
      domRect,
    },
  };
};

export default useCommands;
