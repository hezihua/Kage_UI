import React from 'react';
import { IconProps } from '../index';

export const WarningOutlined: React.FC<IconProps> = ({
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
      <path d="M512 64L64 960h896L512 64zm0-64c-18.2 0-36.1 5.1-51.7 14.7L14.7 512c-19.6 15.6-31.7 38.1-31.7 62.1 0 24 12.1 46.5 31.7 62.1L460.3 1009.3c15.6 9.6 33.5 14.7 51.7 14.7s36.1-5.1 51.7-14.7L1009.3 636.2c19.6-15.6 31.7-38.1 31.7-62.1 0-24-12.1-46.5-31.7-62.1L563.7 14.7C548.1 5.1 530.2 0 512 0z" />
      <path d="M464 288a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm24 112c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V408c0-4.4-3.6-8-8-8h-48z" />
    </svg>
  );
};

