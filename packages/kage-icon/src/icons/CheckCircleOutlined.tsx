import React from 'react';
import { IconProps } from '../index';

export const CheckCircleOutlined: React.FC<IconProps> = ({
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
      <path d="M378.9 512l113.1 113.1c12.5 12.5 32.8 12.5 45.3 0l226.3-226.3c12.5-12.5 12.5-32.8 0-45.3l-16.2-16.2c-12.5-12.5-32.8-12.5-45.3 0L512 562.7 398.9 449.6c-12.5-12.5-32.8-12.5-45.3 0l-16.2 16.2c-12.5 12.5-12.5 32.8 0 45.3z" />
    </svg>
  );
};

