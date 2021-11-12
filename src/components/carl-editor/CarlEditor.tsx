import { FC, useCallback, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react';
import withHeadingShortcuts from '../../carl-editor/plugins/heading-shortcuts';
import withRemoveSplittedIds from '../../carl-editor/plugins/remove-splitted-ids';
import withImages from '../../carl-editor/plugins/images';
import Block from './blocks/Block';
import InlineText from './blocks/InlineText';
import withListShortcuts from '../../carl-editor/plugins/list-shortcuts';
import withQuoteShortcuts from '../../carl-editor/plugins/quote-shortcuts';
import withDividers from '../../carl-editor/plugins/dividers';
import useCommands from '../../carl-editor/plugins/commands';
import { Dropdown, Menu } from 'antd';

type CarlEditorProps = {
  value?: CarlElement[];
  onChange?: (value: CarlElement[]) => void;
};

// TODO set error boundary https://reactjs.org/link/error-boundaries
const CarlEditor: FC<CarlEditorProps> = ({
  value: externalValue,
  onChange,
}) => {
  const { withCommands, handleKeyDown, commandDropdown } = useCommands();

  const editor = useMemo(() => {
    // plugins with the highest priority should be added last
    let editor = createEditor();
    editor = withReact(editor);
    editor = withHistory(editor);
    editor = withCommands(editor);
    editor = withHeadingShortcuts(editor);
    editor = withListShortcuts(editor);
    editor = withQuoteShortcuts(editor);
    editor = withDividers(editor);
    editor = withImages(editor);
    editor = withRemoveSplittedIds(editor);
    return editor;
  }, []);

  const [internalValue, setInternalValue] = useState<CarlElement[]>(
    DEFAULT_INITIAL_VALUE
  );
  const editorValue = externalValue || internalValue;

  const handleChange = useCallback((value: CarlElement[]) => {
    onChange?.(value);
    if (externalValue === undefined) {
      setInternalValue(value);
    }
  }, []);

  const renderElement = useCallback(
    (props: RenderElementProps) => <Block {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <InlineText {...props} />,
    []
  );

  return (
    <>
      <Slate
        editor={editor}
        value={editorValue}
        onChange={(newValue) => handleChange(newValue as CarlElement[])}
      >
        <Editable
          autoFocus
          onKeyDown={(event) => handleKeyDown(event, editor)}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
      {commandDropdown.visible &&
        !!commandDropdown.commands.length &&
        !!commandDropdown.domRect && (
          <Dropdown
            overlay={
              <Menu
                selectedKeys={[commandDropdown.commands[commandDropdown.index]]}
              >
                {commandDropdown.commands.map((command) => (
                  <Menu.Item key={command}>/{command}</Menu.Item>
                ))}
              </Menu>
            }
            visible
          >
            <div
              className="fixed w-1"
              style={{
                height: commandDropdown.domRect.height,
                top: commandDropdown.domRect.top + window.pageYOffset,
                left: commandDropdown.domRect.left + window.pageXOffset,
              }}
            />
          </Dropdown>
        )}
    </>
  );
};

const DEFAULT_INITIAL_VALUE: CarlElement[] = [
  { type: 'paragraph', children: [{ text: '' }] },
];

export default CarlEditor;
