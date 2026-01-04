import React from 'react';
import { IconProps } from '../index';

export const ClockCircleOutlined: React.FC<IconProps> = ({
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
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
      <path d="M512 256c-4.4 0-8 3.6-8 8v248c0 4.4 3.6 8 8 8h248c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H528V264c0-4.4-3.6-8-8-8z" />
    </svg>
  );
};

