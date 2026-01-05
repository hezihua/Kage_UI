import React from 'react';
import { IconProps } from '../index';

export const ScissorOutlined: React.FC<IconProps> = ({
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
      <path d="M567.1 512l318.5-319.3c4-4 4-10.5 0-14.5l-39.8-39.8c-4-4-10.5-4-14.5 0L512.7 457.8 192.7 137.8c-4-4-10.5-4-14.5 0l-39.8 39.8c-4 4-4 10.5 0 14.5L456.9 512 138.4 830.5c-4 4-4 10.5 0 14.5l39.8 39.8c4 4 10.5 4 14.5 0l320-320 320 320c4 4 10.5 4 14.5 0l39.8-39.8c4-4 4-10.5 0-14.5L567.1 512z" />
      <circle cx="304" cy="304" r="32" />
      <circle cx="720" cy="720" r="32" />
    </svg>
  );
};

