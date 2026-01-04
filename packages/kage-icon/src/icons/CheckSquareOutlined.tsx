import React from 'react';
import { IconProps } from '../index';

export const CheckSquareOutlined: React.FC<IconProps> = ({
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
      <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" />
      <path d="M378.9 512l113.1 113.1c12.5 12.5 32.8 12.5 45.3 0l226.3-226.3c12.5-12.5 12.5-32.8 0-45.3l-16.2-16.2c-12.5-12.5-32.8-12.5-45.3 0L512 562.7 398.9 449.6c-12.5-12.5-32.8-12.5-45.3 0l-16.2 16.2c-12.5 12.5-12.5 32.8 0 45.3z" />
    </svg>
  );
};

