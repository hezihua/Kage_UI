import React from 'react';
import { IconProps } from '../index';

export const PauseOutlined: React.FC<IconProps> = ({
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
      <path d="M304 176h80v672h-80zm368 0h80v672h-80z" />
    </svg>
  );
};

