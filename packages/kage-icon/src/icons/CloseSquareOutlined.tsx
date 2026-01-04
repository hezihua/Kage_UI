import React from 'react';
import { IconProps } from '../index';

export const CloseSquareOutlined: React.FC<IconProps> = ({
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
      <path d="M685.4 354.8c0-4.4-3.6-8-8-8L348 366.2c-4.4 0-8 3.6-8 8-.1 1.8.6 3.5 1.9 4.9l112.7 112.7-112.7 112.7c-1.2 1.2-1.9 2.9-1.9 4.9 0 4.4 3.6 8 8 8l329.4 19.4c4.4 0 8-3.6 8-8 0-1.8-.6-3.5-1.9-4.9L557 512l112.7-112.7c1.2-1.2 1.9-2.9 1.9-4.9z" />
    </svg>
  );
};

