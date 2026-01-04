import React from 'react';
import { IconProps } from '../index';

export const DownCircleOutlined: React.FC<IconProps> = ({
  size = 16,
  color = 'currentColor',
  style,
  className,
  onClick,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      fill={color}
      style={style}
      className={className}
      onClick={onClick}
    >
      <path d="M505.5 663.7a7.95 7.95 0 0 0 12.9 0l178-246c3.8-5.3 0-12.7-6.5-12.7H643c-4.6 0-9 2-12.1 5.5L512 564l-118.9-153.5c-3.1-3.5-7.5-5.5-12.1-5.5H347c-6.5 0-10.3 7.4-6.5 12.7l178 246z" />
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
    </svg>
  );
};

