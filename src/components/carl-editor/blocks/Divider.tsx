import classNames from 'classnames';
import { FC } from 'react';
import { RenderElementProps, useFocused, useSelected } from 'slate-react';

type DividerProps = RenderElementProps & {
  element: CarlDivider;
};

const Divider: FC<DividerProps> = ({ attributes, children }) => {
  const selected = useSelected();
  const focused = useFocused();

  return (
    <div {...attributes} className="py-3 mb-2">
      <hr
        className={classNames(
          'm-0 border-0 border-t border-solid border-gray-200',
          { 'ring ': selected && focused }
        )}
        contentEditable={false}
      />
      {children}
    </div>
  );
};

export default Divider;
