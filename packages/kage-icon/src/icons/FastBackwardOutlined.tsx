import React from 'react';
import { IconProps } from '../index';

export const FastBackwardOutlined: React.FC<IconProps> = ({
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
      <path d="M517.6 273.5L230.2 499.3a16.1 16.1 0 0 0 0 25.4l287.4 225.8c10.7 8.4 26.4.8 26.4-12.7V286.2c0-13.5-15.7-21.1-26.4-12.7zm320 0L550.2 499.3a16.1 16.1 0 0 0 0 25.4l287.4 225.8c10.7 8.4 26.4.8 26.4-12.7V286.2c0-13.5-15.7-21.1-26.4-12.7zM140 874h-64a8 8 0 0 1-8-8V158a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8v708a8 8 0 0 1-8 8z" />
    </svg>
  );
};

