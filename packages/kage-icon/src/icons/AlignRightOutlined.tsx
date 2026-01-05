import React from 'react';
import { IconProps } from '../index';

export const AlignRightOutlined: React.FC<IconProps> = ({
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
      <path d="M904 230H408c-4.4 0-8 3.6-8 8v-56c0-4.4 3.6-8 8-8h496c4.4 0 8 3.6 8 8v56c0 4.4-3.6 8-8 8zm0 424H408c-4.4 0-8 3.6-8 8v-56c0-4.4 3.6-8 8-8h496c4.4 0 8 3.6 8 8v56c0 4.4-3.6 8-8 8zm0 140H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-424H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" />
    </svg>
  );
};

