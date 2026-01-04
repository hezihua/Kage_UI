import React from 'react';
import { IconProps } from '../index';

export const FastForwardOutlined: React.FC<IconProps> = ({
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
      <path d="M186.4 273.5L473.8 499.3a16.1 16.1 0 0 1 0 25.4L186.4 750.5c-10.7 8.4-26.4.8-26.4-12.7V286.2c0-13.5 15.7-21.1 26.4-12.7zm320 0L793.8 499.3a16.1 16.1 0 0 1 0 25.4L506.4 750.5c-10.7 8.4-26.4.8-26.4-12.7V286.2c0-13.5 15.7-21.1 26.4-12.7zM884 158h64a8 8 0 0 1 8 8v708a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8V166a8 8 0 0 1 8-8z" />
    </svg>
  );
};
