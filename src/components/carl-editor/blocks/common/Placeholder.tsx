import { FC } from 'react';

type PlaceholderProps = {
  placeholder: string;
};

const Placeholder: FC<PlaceholderProps> = ({ placeholder }) => (
  <span
    className="absolute text-gray-300 select-none pointer-events-none"
    contentEditable={false}
    aria-hidden
  >
    {placeholder}
  </span>
);

export default Placeholder;
