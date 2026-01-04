import React from 'react';
import { IconProps } from '../index';

export const CloseCircleOutlined: React.FC<IconProps> = ({
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
      <path d="M685.4 354.8c0-4.4-3.6-8-8-8L348 366.2c-4.4 0-8 3.6-8 8-.1 1.8.6 3.5 1.9 4.9l112.7 112.7-112.7 112.7c-1.2 1.2-1.9 2.9-1.9 4.9 0 4.4 3.6 8 8 8l329.4 19.4c4.4 0 8-3.6 8-8 0-1.8-.6-3.5-1.9-4.9L557 512l112.7-112.7c1.2-1.2 1.9-2.9 1.9-4.9z" />
    </svg>
  );
};

